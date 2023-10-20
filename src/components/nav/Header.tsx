import Image from 'next/image';
import Link from 'next/link';

import { WalletControlBar } from '../../features/wallet/WalletControlBar';
import Logo from '../../images/logos/logo.jpeg';

export function Header() {
  return (
    <header className="pt-3 pb-2 w-full">
      <div className="flex items-center justify-between">
      <Link href="/" className="py-2 flex items-center">
        <Image src={Logo} width={90} alt="" style={{ borderRadius: '50%' }} />
        <h1 style={{ marginLeft: '0.5rem', fontWeight: 'bold',}}>
          <span style={{ color: 'darkred' }}>xUSD</span> by Banker Smith
        </h1>
      </Link>
        <div className="flex flex-col items-end md:flex-row-reverse md:items-start gap-2">
          <WalletControlBar />
        </div>
      </div>
    </header>
  );
}
