import { getNetwork } from '@wagmi/core';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Card } from '../../components/layout/Card';
import { logger } from '../../utils/logger';
import { XUSDModal } from './xUSDModal';

export function XUSDBurnTokenCard({  tokenOptions }: {
  tokenOptions: any;
}) {
  const [tokenValue, setTokenValue] = useState(0.0);
  const [xUSDValue, setxUSDValue] = useState(0.0);
  const [strXUSDValue, setStrXUSDValue] = useState('');

  const [selectedToken, setSelectedToken] = useState('eth');
  const { address } = useAccount();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [txHash, setTxHash] = useState("")

  useEffect(() => {
    if (!xUSDValue || isNaN(xUSDValue)) {
      setTokenValue(0);
      setxUSDValue(0);
    } else if (xUSDValue && !isNaN(xUSDValue)) {
      setTokenValue(parseFloat((xUSDValue / 2080.57).toFixed(5)));
    }
  }, [xUSDValue, selectedToken]);
  

  const handleBurn = async (e: any) => {
    e.preventDefault();
    const chain  = await getNetwork();

    const burnData = {
      burnerAddress: address,
      amount: xUSDValue,
      amountOfETH: tokenValue,
      priceOfEth: 2080.57,
      chain: chain?.chain?.network,
    };
    try{
      await Axios.post('https://xusd-back-iy4hgrqm3a-lz.a.run.app/api/token/burn', burnData)
        .then(function (response){
          if(response.status == 200){
            setTxHash(response.data.txHash);
            setIsModalOpen(true);
          }
        })
    } catch (error) {
      logger.error("Handle burn: ", error);
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
            placeholder="0.0"
            value={strXUSDValue}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            onChange={(ev) => {
              const input = ev.target.value;
              setStrXUSDValue(input);
              if (/^-?\d*\.?\d*$/.test(input)) {
                const value = parseFloat(input);
                if (!isNaN(value)) { setxUSDValue(value);
                } else {setxUSDValue(0);}
              }}}
          />
          <select
            className="text-black bg-slate-200 rounded px-3 py-1 cursor-pointer"
            disabled={true}
          >
            <option>xUSD</option>
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
            value={tokenValue}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            disabled={true}
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
        <div className="flex flex-grow items-center justify-center">
          <button className="pr-2 pl-2 rounded-lg py-2 bg-red-300 hover:bg-gray-200 text-lg text-white" onClick={handleBurn}>
            Burn xUSD
          </button>
        </div>
        <br/>
      </form>
      <XUSDModal isOpen={isModalOpen} close={() => setIsModalOpen(false)} title="Burning xUSD" txHash={txHash} MintOrBurn='Burned succesfully'/>  
    </Card>
  );
}
