import { useEffect, useState } from 'react';
import { Card } from '../../components/layout/Card';

export function XUSDMintTokenCard({ tokenPrices, tokenOptions }: {
  tokenPrices: any;
  tokenOptions: any;
}) {
  const [tokenValue, setTokenValue] = useState(0);
  const [xUSDValue, setxUSDValue] = useState(0);
  const [selectedToken, setSelectedToken] = useState('eth');

  useEffect(() => {
    if(!tokenValue || isNaN(tokenValue)){
      setTokenValue(0);
      setxUSDValue(0);
    } else if(tokenValue && !isNaN(tokenValue)) {
      setxUSDValue(parseFloat((tokenValue * tokenPrices[selectedToken]).toFixed(2)));
    }
  }, [tokenValue]);

  useEffect(() => {
    if(tokenValue != 0) {
      setxUSDValue(parseFloat((tokenValue * tokenPrices[selectedToken]).toFixed(2)));
    }
  }, [selectedToken])

  return (
<Card classes="w-100 sm:w-[31rem] relative">
  <div className="relative flex items-start justify-center z-20"> {/* Center items */}
    <form className="flex flex-col">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center space-x-2">
          <fieldset className="flex flex-col pr-2 h-full bg-slate-50 border border-purple-400 rounded">
            <input
              type="text"
              placeholder="0.0"
              value={tokenValue}
              onChange={(ev) => setTokenValue(parseFloat(ev.target.value))}
            />
          </fieldset>
          <select
            value={selectedToken}
            onChange={(ev) => setSelectedToken(ev.target.value)}
          >
            {tokenOptions.map((token) => (
              <option key={token} value={token}>
                {token}
              </option>
            ))}
          </select>
        </div>
        <div className='flex justify-center space-x-2'>
          <span>Amount of xUSD: {xUSDValue} </span>
        </div>
      </div>
      <button className="w-full rounded-xl py-2 px-4 bg-red-200 text-lg text-white">
        Mint xUSD
      </button>

    </form>
  </div>
</Card>

  );
}
