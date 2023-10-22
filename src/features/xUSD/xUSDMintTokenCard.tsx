import {
  getNetwork,
  prepareSendTransaction, sendTransaction,
  switchNetwork,
  waitForTransaction
} from '@wagmi/core';
import Axios from 'axios';
import { utils } from 'ethers';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Card } from '../../components/layout/Card';
import { logger } from '../../utils/logger';

function XUSDMintTokenCard({ tokenOptions, chainIDs }: {
  tokenOptions: any;
  chainIDs: any;
}) {
  const [tokenValue, setTokenValue] = useState(0.0);
  const [xUSDValue, setxUSDValue] = useState(0.0);
  const [selectedToken, setSelectedToken] = useState('goerli');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMintSuccess, setIsMintSuccess] = useState(false);
  const [isGASMintSuccess, setIsGASMintSuccess] = useState(true);
  
  useEffect(() => {
    if (!tokenValue || isNaN(tokenValue)) {
      setTokenValue(0);
      setxUSDValue(0);
    } else if (tokenValue && !isNaN(tokenValue)) {
      setxUSDValue(parseFloat((tokenValue * 1608).toFixed(2)));
    }
  }, [tokenValue, selectedToken]);
  
  const prepareTransactionConfig = {
    request: {
      chainId: chainIDs[selectedToken], // Replace with your desired chain ID
      to: '0xB038D8FA580BBC5a77FB9E103AC813865ad2240E', // Replace with the recipient's address or ENS name
      value: utils.parseEther(tokenValue.toFixed(2)) || utils.parseEther('0.1'), // Replace with the amount you want to send
    }
  };

  const { address } = useAccount();
  
  const handleTransfer = async (e: any) => {
    e.preventDefault();
    try{
      const config = await prepareSendTransaction(prepareTransactionConfig);
      const chain  = await getNetwork();
      if(chain?.chain?.id != chainIDs[selectedToken]){
        await switchNetwork({ chainId: 5 });
      }
      const result = await sendTransaction( config);
      const isSuccess = await waitForTransaction({hash: result?.hash,})
      if(isSuccess?.transactionHash){
        setIsSuccess(true);
      }
      const burnData = {
        receiverAddress: address,
        amount: xUSDValue,
        amountOfETH: tokenValue,
        priceOfEth: 1608.20,
      };

      await Axios.post('https://xusd-back-iy4hgrqm3a-lz.a.run.app/api/token/mint', burnData)
      .then(function (response){
        if(response.status == 200){
          setIsMintSuccess(true);
        } else{
          setIsGASMintSuccess(false);
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
            value={tokenValue}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(ev) => {
              const input = ev.target.value;
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
                {token.toUpperCase()} ETH
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
          <button className="pr-2 pl-2 rounded-lg py-2 bg-red-300 text-lg text-white" onClick={handleTransfer}>
            Mint xUSD
          </button>
        </div>
        <br/> 
      </form>
      {isSuccess && (
        <div>
          <span>Succesfully transferred ETH</span>
        </div>
      )}
      {isMintSuccess && (
        <div>
          <span>Succesfully minted xUSD</span>
        </div>
      )}
      {!isGASMintSuccess && (
        <div>
          <span>Problem with gas right now, try minting xUSD later</span>
        </div>
      )}
    </Card>
  );
}

export default XUSDMintTokenCard;