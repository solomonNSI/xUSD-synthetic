import type { NextPage } from 'next';
import { useState } from 'react';

import { SolidButton } from '../components/buttons/SolidButton';
import { TipCard } from '../components/tip/TipCard';
import AnotherTokenCard from '../features/another/AnotherTokenCard';
import { TransferTokenCard } from '../features/transfer/TransferTokenCard';

const Button = ({ onClick, title, text }) => (
  <SolidButton classes="py-1.5 px-2.5" onClick={onClick} title={title}>
    <div className="ml-1.5 text-white text-xs sm:text-sm">{text}</div>
  </SolidButton>
);

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState('tip'); // Default to 'tip';

  return (
    <div className="space-y-2">
      <div className="flex flex-row space-x-2">
        <Button onClick={() => setCurrentPage('tip')} title="crosschain" text="Cross Chain" />
        <Button onClick={() => setCurrentPage('transfer')} title="mintburn" text="Mint / Burn" />
        <Button onClick={() => setCurrentPage('another')} title="lendborrow" text="Lend / Borrow" />
      </div>
      <div style={{ minHeight: '300px' }}>
        {currentPage === 'tip' && (
          <>
            <TipCard />
            <TransferTokenCard />
          </>
        )}
        {currentPage === 'transfer' && <TransferTokenCard />}
        {currentPage === 'another' && <AnotherTokenCard />}
      </div>
    </div>
  );
};

export default Home;
