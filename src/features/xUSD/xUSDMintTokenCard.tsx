import {
  getNetwork,
  prepareSendTransaction, sendTransaction,
  switchNetwork
} from '@wagmi/core';
import Axios from 'axios';
import { utils } from 'ethers';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Card } from '../../components/layout/Card';
import { logger } from '../../utils/logger';
import { XUSDLoader } from './xUSDLoader';
import { XUSDModal } from './xUSDModal';

function XUSDMintTokenCard({ tokenOptions, chainIDs }: {
  tokenOptions: any;
  chainIDs: any;
}) {
  const [tokenValue, setTokenValue] = useState(0.0);
  const [strTokenValue, setStrTokenValue] = useState("");

  const [xUSDValue, setxUSDValue] = useState(0.0);
  const [selectedToken, setSelectedToken] = useState('goerli');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [txHash, setTxHash] = useState("")
  const [isLoaderModalOpen, setIsLoaderModalOpen] = useState(false)
  const [insideText, setInsideText] = useState("Awesome! You will now receive a wallet pop-up to sign the transaction")

  useEffect(() => {
    if (!tokenValue || isNaN(tokenValue)) {
      setTokenValue(0);
      setxUSDValue(0);
    } else if (tokenValue && !isNaN(tokenValue)) {
      setxUSDValue(parseFloat((tokenValue * 2080.57).toFixed(2)));
    }
  }, [tokenValue, selectedToken]);
  

  const { address } = useAccount();
  
  const handleTransfer = async (e: any) => {
    e.preventDefault();
    try{
      setIsLoaderModalOpen(true);
      const prepareTransactionConfig = {
        request: {
          chainId: chainIDs[selectedToken], 
          to: '0xc9326acD1a9245Ca117c9d041c2fb26C7fC1ed4D',
          value: utils.parseEther(tokenValue.toFixed(4)), 
        }
      };

      const config = await prepareSendTransaction(prepareTransactionConfig);
      const chain  = await getNetwork();

      if(chain?.chain?.id != chainIDs[selectedToken]){ await switchNetwork({ chainId: chainIDs[selectedToken] });}
      await sendTransaction(config);
      setIsLoaderModalOpen(false);
      // const isSuccess = await waitForTransaction({hash: result?.hash,})
      setInsideText("It all went smooth, now we're going to mint your tokens!")
      // if(isSuccess?.transactionHash){
      //   setInsideText("It all went smooth, now we're going to mint your tokens!")
      //   setIsLoaderModalOpen(true);
      // }
      console.log("yooo");
      const burnData = {
        receiverAddress: address,
        amount: xUSDValue,
        amountOfETH: tokenValue,
        priceOfEth: 2080.57,
        chain: chain?.chain?.network,
      };

      await Axios.post('https://xusd-back-iy4hgrqm3a-lz.a.run.app/api/token/mint', burnData)
        .then(function (response){
          if(response.status == 200){
            setIsLoaderModalOpen(false);
            setTxHash(response.data.txHash);
            setIsModalOpen(true);
          }
      })
    } catch (error){
      logger.error("error minting: ", error);
    }
  }

  return (
    <Card>
      <form className="flex flex-col">
        <br/> 
        <div className="flex items-center space-x-2">
          <span className="flex-grow">Balance:</span>
          <span className="flex-grow text-right pr-6">Token:</span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder='0'
            value={strTokenValue}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(ev) => {
              const input = ev.target.value;
              setStrTokenValue(input);
              if (/^-?\d*\.?\d*$/.test(input)) {
                setTokenValue(parseFloat(ev.target.value) || 0);
              }}}
          />
          <select
            className="uppercase text-black bg-slate-200 rounded px-3 py-1 cursor-pointer"
            value={selectedToken}
            onChange={(ev) => setSelectedToken(ev.target.value)}
          >
            {tokenOptions.map((token) => (
              <option key={token} value={token}>
                {token} ETH
              </option>
            ))}
          </select>
        </div>
        <br/>
        <div className="flex items-center space-x-2">
          <span>You receive:</span>
          <span className="flex-grow text-right pr-6">Token:</span>
        </div>
        <div className="flex justify-between space-x-2">
          <input
            type="number"
            placeholder="0.0"
            value={xUSDValue}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            disabled={true}
          />
          <select
            className="text-black bg-slate-200 rounded px-3 py-1 cursor-pointer"
            value={selectedToken}
            disabled={true}
          >
            <option>xUSD</option>
          </select>
        </div>
        <br/>
        <div className="flex flex-grow items-center justify-center">
          <button className="pr-2 pl-2 rounded-lg py-2 bg-red-300 hover:bg-gray-200 text-lg text-white" onClick={handleTransfer}>
            Mint xUSD
          </button>
        </div>
        <br/> 
      </form>
      <XUSDModal isOpen={isModalOpen} close={() => setIsModalOpen(false)} title="Minting xUSD" txHash={txHash} MintOrBurn='Minted succesfully'/>
      <XUSDLoader isOpen={isLoaderModalOpen} close={() => setIsLoaderModalOpen(false)} title="Loading" insideText={insideText}/>
    </Card>
  );
}

export default XUSDMintTokenCard;