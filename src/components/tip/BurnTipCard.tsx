import Image from 'next/image';
import { useState } from 'react';

import { config } from '../../consts/config';
import { links } from '../../consts/links';
import InfoCircle from '../../images/icons/info-circle.svg';
import XCircle from '../../images/icons/x-circle.svg';
import { IconButton } from '../buttons/IconButton';

export function BurnTipCard() {
  const [show, setShow] = useState(config.showTipBox);
  if (!show) return null;
  return (
    <div className="relative px-3 py-3 w-90 bg-yellow-100 shadow-lg rounded-xl opacity-95">
      <h2 className="text-black sm:text-lg">Alpha Tip: Try minting xUSD!</h2>
      <div className="flex items-end justify-between ">
        <p className="text-black mt-1.5 text-xs sm:text-sm max-w-[70%]">
          Be a holder of a synthetic USD that offers capital efficiency ...
        </p>
        <a
          href={links.memo}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 px-3 py-1.5 flex items-center bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-xs sm:text-sm text-blue-500 rounded-md transition-all"
        >
          <Image src={InfoCircle} width={14} alt="" />
          <span className="ml-1">Learn More</span>
        </a>
      </div>
      <div className="absolute right-3 top-3 invert">
        <IconButton
          imgSrc={XCircle}
          onClick={() => setShow(false)}
          title="Hide tip"
          classes="hover:rotate-90"
        />
      </div>
    </div>
  );
}