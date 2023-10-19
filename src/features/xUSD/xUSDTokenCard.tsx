import { useEffect, useState } from 'react';
import { Card } from '../../components/layout/Card';

export function XUSDTokenCard() {
  const [row1Value, setRow1Value] = useState(0);
  const [row3Value, setRow3Value] = useState(0);
  const [selectedToken, setSelectedToken] = useState('eth');
  const [mint, setMint] = useState(true); // Minting is the default
  const [isTokenSelectVisible, setTokenSelectVisible] = useState(true);
  
  // Fetch and store token prices at the start of the app
  const [tokenPrices, setTokenPrices] = useState({});
  
  const [ethToUsdRate, setEthToUsdRate] = useState(false);
  const tokenOptions = ['eth', 'btc', 'matic', 'bnb', 'ape'];

  useEffect(() => {
    const fetchPrices = async () => {
      const prices = {};
      for (const token of tokenOptions) {
        try {
          const response = await fetch(`https://rest.coinapi.io/v1/exchangerate/${token}/USD`, {
            method: 'GET',
            headers: { 'X-CoinAPI-Key': '66E9E14D-DFF0-4855-A831-19CD34995403' },
          });
          const data = await response.json();
          prices[token] = data.rate;
        } catch (error) {
          console.error(`Error fetching ${token} price:`, error);
        }
      }
      setEthToUsdRate(true);
      setTokenPrices(prices);
    };
    if (ethToUsdRate === false) {
      fetchPrices();
    }
  }, [ethToUsdRate]);

  // Function to handle the direction switch button click
  const handleDirectionSwitch = () => {
    setMint(!mint);
    setTokenSelectVisible(!isTokenSelectVisible);
  };

  // Function to automatically update row3 value when inputting numbers into row1
  useEffect(() => {
    if (row1Value && !isNaN(row1Value)) {
      const price = tokenPrices[selectedToken] || 0;
      setRow3Value(parseFloat((row1Value * price).toFixed(5)));
    }
  }, [row1Value, selectedToken, tokenPrices]);

  // Function to handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Implement your submit logic here
    // Use the 'mint' state to determine whether to mint or burn
    // Use 'row1Value' and 'selectedToken' for the input values
    // and 'row3Value' for the calculated value
  };

  return (
    <Card classes="w-100 sm:w-[31rem] relative">
      <div className="relative flex items-start justify-between z-20">
        <form className="flex flex-col">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-center space-x-2">
              <fieldset className="flex flex-col pr-2 h-full bg-slate-50 border border-purple-400 rounded">
                <input
                  type="text"
                  placeholder="0.0"
                  value={row1Value}
                  onChange={(ev) => setRow1Value(parseFloat(ev.target.value))}
                />
              </fieldset>
              {isTokenSelectVisible && mint && (
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
              )}
            </div>
            <div>
              <button className="mb-2 text-xl"onClick={(e) => {
                e.preventDefault();
                handleDirectionSwitch();
                }}
              >
                🔄
              </button>
            </div>
            <div className='flex justify-center space-x-2'>
              <span>Calculated Value: {row3Value}</span>
              {!isTokenSelectVisible && !mint && (
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
              )}
            </div>
          </div>
          <button className="w-full rounded-xl py-4 bg-slate-100 text-xl" onClick={handleSubmit}>
            {mint ? "Mint xUSD" : "Burn xUSD"}
          </button>
        </form>
      </div>
    </Card>
  );
}
