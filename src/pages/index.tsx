import type { NextPage } from 'next';
import { useState } from 'react';
import { SolidButton } from '../components/buttons/SolidButton';
import { LendBrwTipCard } from '../components/tip/LendBrwTipCard';
import { MintBurnTipCard } from '../components/tip/MintBurnTipCard';
import { TipCard } from '../components/tip/TipCard';
import AnotherTokenCard from '../features/another/AnotherTokenCard';
import { TransferTokenCard } from '../features/transfer/TransferTokenCard';
import { XUSDTokenCard } from '../features/xUSD/xUSDTokenCard';

const Button = ({ onClick, title, text }) => (
  <SolidButton classes="py-1.5 px-2.5" onClick={onClick} title={title}>
    <div className="ml-1.5 text-white text-xs sm:text-sm">{text}</div>
  </SolidButton>
);

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState('mint'); // Default to 'tip';

  return (
    <div className="space-y-2">
      <div className="flex flex-row space-x-2">
        <Button onClick={() => setCurrentPage('mint')} title="mintburn" text="Mint / Burn" />
        <Button onClick={() => setCurrentPage('cross')} title="crosschain" text="Cross Chain" />
        <Button onClick={() => setCurrentPage('soon')} title="lendborrow" text="Lend / Borrow" />
      </div>
      <div style={{ minHeight: '300px' }}>
        {currentPage === 'mint' && (
          <>
            <MintBurnTipCard/>
            <XUSDTokenCard />
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
