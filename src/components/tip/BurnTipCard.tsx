import { useState } from 'react';

import { config } from '../../consts/config';
import XCircle from '../../images/icons/x-circle.svg';
import { IconButton } from '../buttons/IconButton';

export function BurnTipCard() {
  const [show, setShow] = useState(config.showTipBox);
  if (!show) return null;
  return (
    <div className="relative px-3 py-3 w-90 bg-yellow-100 shadow-lg rounded-xl opacity-95">
      <h2 className="text-black sm:text-lg text-center">Burning xUSD!</h2>
      <div className="flex items-end justify-between ">
        <div className='px-3 py-3'>
          <p className="text-black mt-1.5 text-xs sm:text-sm max-w-[80%]">
            The protocol:
          </p>
          <p className='py-2'>
            - Closes the delta-neutral position
          </p>
          <p className='py-2'>
            - Returns ETH deposited by user
          </p>
          <p className='py-2'>
            - Burns xUSD from user&apos;s wallet
          </p>
        </div>

        {/* <a
          href={links.memo}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 px-3 py-1.5 flex items-center bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-xs sm:text-sm text-blue-500 rounded-md transition-all"
        >
          <Image src={InfoCircle} width={14} alt="" />
          <span className="ml-1">Learn More</span>
        </a> */}
      </div>
      <div className="absolute right-3 top-3">
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
