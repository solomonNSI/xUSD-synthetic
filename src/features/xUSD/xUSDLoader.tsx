import { Modal } from "../../components/layout/Modal";

export function XUSDLoader({
  isOpen,
  close,
  title,
  insideText,
}: {
  isOpen: boolean,
  close: () => void;
  title: string,
  insideText: string
}
){
  return (
    <Modal isOpen={isOpen} title={title} close={close}>
      <div className="p-4">
        <div className="mt-2 flex flex-col space-y-2">
          <span className="text-sm font-bold"> {insideText} </span>
        </div>
      </div>
    </Modal>
  );
}