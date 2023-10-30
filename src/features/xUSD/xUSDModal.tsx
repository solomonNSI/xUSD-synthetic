import clipboardCopy from 'clipboard-copy';
import { useState } from 'react';
import { Modal } from "../../components/layout/Modal";

export function XUSDModal({
  isOpen,
  close,
  title,
  txHash,
  MintOrBurn,
}: {
  isOpen: boolean,
  close: () => void;
  title: string,
  txHash: string,
  MintOrBurn: string
}
){
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipboard = () => {
    clipboardCopy(txHash)
      .then(() => {
        setCopySuccess('Copied to clipboard');
      })
      .catch((error) => {
        console.error('Copy to clipboard failed:', error);
      });
  };

  return (
    <Modal isOpen={isOpen} title={title} close={close}>
      <div className="mt-2 flex flex-col space-y-2">
        <p> {MintOrBurn}! Here is the tx hash: </p>
        <div className="flex space-x-2">
          <p>{txHash.substring(0, 5)}...{txHash.slice(-2)}</p>
          <button
            className="bg-blue-500 text-white py-1 px-3 rounded"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
        {copySuccess && <p className="text-green-500">{copySuccess}</p>}
      </div>
    </Modal>
  );
}