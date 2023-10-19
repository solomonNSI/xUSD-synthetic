import React from 'react';

interface SwapInputProps {
  token: string;
  amount: string;
  setAmount: (value: string) => void;
  disabled: boolean;
  readOnly: boolean;
}

const SwapInput: React.FC<SwapInputProps> = ({ token, amount, setAmount, disabled, readOnly }) => {
  return (
    <fieldset className="SwapInput" disabled={disabled}>
      <input
        type="text"
        id={token + "_amount"}
        placeholder="0.0"
        value={amount}
        onChange={(ev) => {
          setAmount(ev.target.value);
        }}
        readOnly={readOnly}
      />
      <span className='pl-2 pt-2'>{token}</span>
    </fieldset>
  );
};

export default SwapInput;
