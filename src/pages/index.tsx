import type { NextPage } from 'next';
import { useMemo, useState } from 'react';
import { BurnTipCard } from "../components/tip/BurnTipCard";
import { MintTipCard } from '../components/tip/MintTipCard';
import AnotherTokenCard from '../features/another/AnotherTokenCard';
import { TransferTokenCard } from '../features/transfer/TransferTokenCard';
import { XUSDBurnTokenCard } from '../features/xUSD/xUSDBurnTokenCard';
import XUSDMintTokenCard from '../features/xUSD/xUSDMintTokenCard';

export const Button = ({ onClick, title, text, chosen }) => (
  <button
    className={`sm:text-lg text-lg py-1.5 px-2.5`}
    style={{ textDecoration: chosen ? 'underline' : 'none' }}
    onClick={onClick}
    title={title}
  >
    {text}
  </button>
);

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState('mint'); // Default to 'tip';
  
  // const [ethToUsdRate, setEthToUsdRate] = useState(true);
  const tokenOptions = ['goerli', 'arbitrumgoerli', 'mumbai', 'scroll', 'zkevm', 'mantle'];
  
  const chainIDs = useMemo(() => ({
    'goerli': 5,
    'arbitrumgoerli': 421613,
    'mumbai': 80001,
    'scroll':534351,
    'zkevm': 1442,
    'mantle': 5001
  }), []);

  // const chainToToken = useMemo(() => ({
  //   'goerli': 'ETH',
  //   'arbitrumgoerli': 'ETH',
  //   'mumbai': 'ETH',
  //   'scroll': 'ETH',
  // }), []);

  return (
    <div className="space-y-2">
      <div className="flex flex-row space-x-4">
      <Button
        onClick={() => setCurrentPage('mint')}
        title="mintburn"
        text="Mint xUSD"
        chosen={currentPage === 'mint'}
      />
      <Button
        onClick={() => setCurrentPage('burn')}
        title="mintburn"
        text="Burn xUSD"
        chosen={currentPage === 'burn'}
      />
      <Button
        onClick={() => setCurrentPage('cross')}
        title="crosschain"
        text="Cross Chain"
        chosen={currentPage === 'cross'}
      />
      <Button
        onClick={() => setCurrentPage('soon')}
        title="lendborrow"
        text="Lend / Borrow"
        chosen={currentPage === 'soon'}
      />
      </div>
      <br/>
      <div style={{ minHeight: '300px' }}>
        {currentPage === 'mint' && (
          <>
            <XUSDMintTokenCard  tokenOptions={tokenOptions} chainIDs={chainIDs}/>
            <div className="flex items-center flex-col justify-center">
              <br/>
              <MintTipCard />
            </div>
          </>
        )}
        {currentPage === 'burn' && (
          <>
            <XUSDBurnTokenCard tokenOptions={tokenOptions}/>
            <div className="flex items-center flex-col justify-center"> {/* Centering container */}
              <br/>
              <BurnTipCard />
            </div>
          </>
        )}
        {currentPage === 'cross' && (
          <>
            <TransferTokenCard />
            {/* <TipCard /> */}
          </>
        )}
        {currentPage === 'soon' && (
            <AnotherTokenCard />
        )}
      </div>
    </div>
  );
};

export default Home;

// Future scenarios: when we would want to fetch the prices
  // const tokenAddresses = useMemo(() => ({
  //   'eth' : "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
  //   'matic': "0xcc42724c6683b7e57334c4e856f4c9965ed682bd",
  //   'ape' : "0x4d224452801aced8b2f0aebe155379bb5d594381", 
  //   'fil': "0x0d8ce2a99bb6e3b7db580ed848240e4a0f9ae153",
  // }), []);
  
  // useEffect( () => {
  //   const fetchPrices = async () => {
  //     if (!Moralis.Core.isStarted) {
  //       await Moralis.start({
  //         apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjdiNDI5NTljLTAxMTktNDExNS05MjgxLTFiMzE0MjI5ZGIzNSIsIm9yZ0lkIjoiMzE0ODk5IiwidXNlcklkIjoiMzIzNzc3IiwidHlwZUlkIjoiMzhlNWJjZjAtNTU2Ni00ZThmLWJjNGQtNzRhZjVhN2IxMDAwIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODI2ODQ1NzIsImV4cCI6NDgzODQ0NDU3Mn0.Q98x5X5kKwZbFqf3JFQBKyu_9_BVrj18rZph8xsHgVc",
  //       });
  //     }
  //     const chain = EvmChain.ETHEREUM;
       
  //     const prices = {};
  //     for (const token in tokenAddresses) {
  //       try {
  //         const response = await Moralis.EvmApi.token.getTokenPrice({
  //           "chain": token == 'ape' ? chain : "0x38",
  //           "address": tokenAddresses[token],
  //         });
  //         const data = await response.toJSON();
  //         prices[token] = parseFloat((data.usdPrice).toFixed(2));
  //       } catch (error) {
  //         logger.error(error);
  //       }
  //     }
  //     setEthToUsdRate(true);
  //     // setTokenPrices(prices);
  //   };
  //   if (ethToUsdRate === false) {
  //     void fetchPrices();
  //   }
  // }, [ethToUsdRate, tokenAddresses]);