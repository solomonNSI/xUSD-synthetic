import { useEffect, useState } from 'react';
import { Card } from '../../components/layout/Card';

export function XUSDBurnTokenCard({ tokenPrices, tokenOptions }: {
  tokenPrices: any;
  tokenOptions: any;
}) {
  const [tokenValue, setTokenValue] = useState(0);
  const [xUSDValue, setxUSDValue] = useState(0);
  const [selectedToken, setSelectedToken] = useState('eth');

  useEffect(() => {
    if (!xUSDValue || isNaN(xUSDValue)) {
      setTokenValue(0);
      setxUSDValue(0);
    } else if (xUSDValue && !isNaN(xUSDValue)) {
      setTokenValue(parseFloat((xUSDValue / tokenPrices[selectedToken]).toFixed(2)));
    }
  }, [xUSDValue, tokenPrices, selectedToken]);
  

  return (
    <Card classes="w-100 sm:w-[31rem] sm:h-[20rem] justify-center items-center flex">
      <div className="relative flex items-center justify-center z-20">
        <form className="flex flex-col">
          <div className="flex flex-col space-y-4">
            <div className="flex items-end space-x-2">
              <input
                type="number"
                placeholder="0.0"
                value={xUSDValue}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                onChange={(ev) => setxUSDValue(parseFloat(ev.target.value))}
              />
              <span></span>xUSD
            </div>
            <div className='flex justify-center space-x-2'>
              <span style={{ marginRight: '10px' }}>Amount of</span>
              <select
                className="uppercase text-white bg-blue-500 rounded px-3 py-1 cursor-pointer"
                value={selectedToken}
                onChange={(ev) => setSelectedToken(ev.target.value)}
              >
                {tokenOptions.map((token) => (
                  <option key={token} value={token}>
                    {token.toUpperCase()}
                  </option>
                ))}
              </select>
              <span>: {tokenValue}</span>
            </div>
          </div>
          <br/>
          <button className="rounded-xl py-2 bg-red-200 text-lg text-white" >
            Burn xUSD
          </button>
        </form>
      </div>
    </Card>
  );
}
