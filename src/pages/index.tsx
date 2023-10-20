import { WideChevron } from "@hyperlane-xyz/widgets";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import Moralis from "moralis";
import type { NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';
import { LendBrwTipCard } from '../components/tip/LendBrwTipCard';
import { MintBurnTipCard } from '../components/tip/MintBurnTipCard';
import { TipCard } from '../components/tip/TipCard';
import AnotherTokenCard from '../features/another/AnotherTokenCard';
import { TransferTokenCard } from '../features/transfer/TransferTokenCard';
import { XUSDBurnTokenCard } from '../features/xUSD/xUSDBurnTokenCard';
import { XUSDMintTokenCard } from '../features/xUSD/xUSDMintTokenCard';

const Button = ({ onClick, title, text, chosen }) => (
  <button
    className={`text-xs sm:text-sm py-1.5 px-2.5`}
    style={{ textDecoration: chosen ? 'underline' : 'none' }}
    onClick={onClick}
    title={title}
  >
    {text}
  </button>
);


const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState('mint'); // Default to 'tip';
  
  const [tokenPrices, setTokenPrices] = useState({});
  const [ethToUsdRate, setEthToUsdRate] = useState(false);
  const tokenOptions = ['eth', 'matic', 'ape', 'fil'];
  
  const tokenAddresses = useMemo(() => ({
    'eth' : "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    'matic': "0xcc42724c6683b7e57334c4e856f4c9965ed682bd",
    'ape' : "0x4d224452801aced8b2f0aebe155379bb5d594381", 
    'fil': "0x0d8ce2a99bb6e3b7db580ed848240e4a0f9ae153",
  }), []);
  
  useEffect( () => {
    const fetchPrices = async () => {
      if (!Moralis.Core.isStarted) {
        await Moralis.start({
          apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjdiNDI5NTljLTAxMTktNDExNS05MjgxLTFiMzE0MjI5ZGIzNSIsIm9yZ0lkIjoiMzE0ODk5IiwidXNlcklkIjoiMzIzNzc3IiwidHlwZUlkIjoiMzhlNWJjZjAtNTU2Ni00ZThmLWJjNGQtNzRhZjVhN2IxMDAwIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODI2ODQ1NzIsImV4cCI6NDgzODQ0NDU3Mn0.Q98x5X5kKwZbFqf3JFQBKyu_9_BVrj18rZph8xsHgVc",
        });
      }
      const chain = EvmChain.ETHEREUM;
       
      const prices = {};
      for (const token in tokenAddresses) {
        try {
          const response = await Moralis.EvmApi.token.getTokenPrice({
            "chain": token == 'ape' ? chain : "0x38",
            "address": tokenAddresses[token],
          });
          const data = await response.toJSON();
          prices[token] = parseFloat((data.usdPrice).toFixed(2));
        } catch (error) {}
      }
      setEthToUsdRate(true);
      setTokenPrices(prices);
    };
    if (ethToUsdRate === false) {
      void fetchPrices();
    }
  }, [ethToUsdRate, tokenAddresses]);

  return (
    <div className="space-y-2">
      <div className="flex flex-row space-x-2">
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
      <div style={{ minHeight: '300px' }}>
        {currentPage === 'mint' && (
          <>
            <div className="flex items-center flex-col justify-center"> {/* Centering container */}
              <MintBurnTipCard />
              <WideChevron direction="s" height="10%" width="10" color="red" rounded={true} />
              <WideChevron direction="s" height="10%" width="10" color="red" rounded={true} />
              <WideChevron direction="s" height="10%" width="10" color="red" rounded={true} />
            </div>
            <XUSDMintTokenCard tokenPrices={tokenPrices} tokenOptions={tokenOptions}/>
          </>
        )}
        {currentPage === 'burn' && (
          <>
            <div className="flex items-center flex-col justify-center"> {/* Centering container */}
              <MintBurnTipCard />
              <WideChevron direction="s" height="10%" width="10" color="red" rounded={true} />
              <WideChevron direction="s" height="10%" width="10" color="red" rounded={true} />
              <WideChevron direction="s" height="10%" width="10" color="red" rounded={true} />
            </div>
            <XUSDBurnTokenCard tokenPrices={tokenPrices} tokenOptions={tokenOptions}/>
          </>
        )}
        {currentPage === 'cross' && (
          <>
            <TipCard />
            <TransferTokenCard />
          </>
        )}
        {currentPage === 'soon' && (
          <>
            <LendBrwTipCard/>
            <AnotherTokenCard />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
