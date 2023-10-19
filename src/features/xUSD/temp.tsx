import { useEffect, useState } from 'react';
import debounce from '../lib/debounce';
import './SwapForm.css';

const SwapInput: React.FC<{
  token: string;
  amount: number | string;
  setAmount: (value: number | string) => void;
  disabled: boolean;
  readOnly: boolean;
}> = ({ token, amount, setAmount, disabled, readOnly }) => {
  return (
    <fieldset className="SwapInput" disabled={disabled}>
      <input
        type="text"
        id={token + '_amount'}
        placeholder="0.0"
        value={amount}
        onChange={(ev) => {
          setAmount(ev.target.value);
        }}
        readOnly={readOnly}
      />
      <span className="pl-2 pt-2">{token}</span>
    </fieldset>
  );
};

const ChangeDirectionButton: React.FC<{
  onClick: () => void;
  disabled: boolean;
}> = ({ onClick, disabled }) => {
  return (
    <button className="ChangeDirectionBtn" onClick={onClick} disabled={disabled}>
      🔄
    </button>
  );
};

const SwapForm: React.FC = () => {

  const [trueForMint, setMint] = useState<boolean>(true);
  const [amountFromUser, setAmountFromUser] = useState<number | null>(0); // amountFromUser - ethAmount equivalent
  const [amountOfXUSD, setAmountOfXUSD] = useState<number | null>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [ethToUsdRate, setEthToUsdRate] = useState<number | null>(null);
  const [showLoader, setShowLoader] = useState<boolean>(false); // State for showing the loader modal

  useEffect(() => {
    if (ethToUsdRate === null) {
      fetch('https://rest.coinapi.io/v1/exchangerate/ETH/USD', {
        method: 'GET',
        headers: { 'X-CoinAPI-Key': '66E9E14D-DFF0-4855-A831-19CD34995403' },
      })
        .then((response) => response.json())
        .then((data) => {
          const ethRate = data.rate;
          setEthToUsdRate(ethRate);
        })
        .catch((error) => {
          console.error('Error fetching ETH price:', error);
        });
    }
  }, [ethToUsdRate]);

  // Swaps tokens by calling the backend API
  // const swap = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();
  //   try {
  //     if (!account) {
  //       console.error('Wallet not connected.');
  //       return;
  //     }

  //     setShowLoader(true); // Show the loader modal when the button is pressed

  //     if (trueForMint) {
  //       console.log('amountFromUser: ', amountFromUser);
  //       console.log('priceOfETH: ', ethToUsdRate);

  //       const mintData = {
  //         receiverAddress: account,
  //         amount: parseFloat(amountOfXUSD || '0'),
  //         amountOfETH: parseFloat(amountFromUser || '0'),
  //         priceOfEth: ethToUsdRate as number,
  //       };

  //       const addr = '0xe61a67ae966c9e2fb8effd30b7cdd29689fd6a99';
  //       const ether = amountFromUser as string;

  //       await window.ethereum.send('eth_requestAccounts');
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       const signer = provider.getSigner();
  //       ethers.utils.getAddress(addr);
  //       const tx = await signer.sendTransaction({
  //         to: addr,
  //         value: ethers.utils.parseEther(ether),
  //       });
  //       console.log({ ether, addr });
  //       console.log('tx', tx);
  //       const response = await Axios.post('https://xusd-back-iy4hgrqm3a-lz.a.run.app/api/token/mint', mintData);
  //       console.log(response);
  //       console.log(`Transaction successful. TX Hash: ${response.data.transactionHash}`);
  //     } else {
  //       console.log('in burn');
  //       const burnData = {
  //         burnerAddress: account,
  //         amount: parseFloat(amountOfXUSD || '0'),
  //         amountOfETH: parseFloat(amountFromUser || '0'),
  //         priceOfEth: ethToUsdRate as number,
  //       };

  //       const response = await Axios.post('https://xusd-back-iy4hgrqm3a-lz.a.run.app/api/token/burn', burnData);
  //       console.log(response);

  //       console.log(`Transaction successful. TX Hash: ${response.data.transactionHash}`);
  //     }
  //     setShowLoader(false);
  //   } catch (error) {
  //     console.error('Error during mint/burn:', error);
  //     setShowLoader(false); // Hide the loader modal in case of an error
  //   }
  // };

  // Calculates output amount by querying the Quoter contract. Sets 'priceAfter' and 'amountOut'.
  const updateAmountOut = debounce((amount: number | string) => {
    if (amount === 0 || amount === '0') {
      setAmountOfXUSD(null);
      setAmountFromUser(null);
      return;
    }
    setLoading(true);
    if (trueForMint) {
      const total = parseFloat(amount) * (ethToUsdRate as number);
      setAmountOfXUSD(total.toFixed(3));
    } else {
      const total = parseFloat(amount) / (ethToUsdRate as number);
      setAmountFromUser(total.toFixed(5));
    }
    setLoading(false);
    return;
  });

  // Wraps 'setAmount', ensures amount is correct, and calls 'updateAmountOut'.
  const setAmountFn = (setAmountFn: (value: number | null) => void) => {
    return (amount: number | string) => {
      amount = amount || null;
      setAmountFn(parseFloat(amount));
      updateAmountOut(amount);
    };
  };

  const toggleDirection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setMint(!trueForMint);
  };

  return (
    <section className="SwapContainer">
      <header className="items-center">
        <h1>Swap tokens</h1>
      </header>
      <form className="SwapForm">
        <SwapInput
          amount={trueForMint ? amountFromUser : amountOfXUSD}
          disabled={!enabled || loading}
          readOnly={false}
          setAmount={setAmountFn(trueForMint ? setAmountFromUser : setAmountOfXUSD)}
          token={trueForMint ? 'ETH' : 'xUSD'}
        />
        <ChangeDirectionButton onClick={toggleDirection} disabled={!enabled || loading} />
        <SwapInput
          amount={trueForMint ? amountOfXUSD : amountFromUser}
          disabled={!enabled || loading}
          readOnly={true}
          token={trueForMint ? 'xUSD' : 'ETH'}
        />
        {trueForMint ? (
          <button className="swap" disabled={!enabled || loading} onClick={swap}>
            Mint xUSD
          </button>
        ) : (
          <button className="swap" disabled={!enabled || loading} onClick={swap}>
            Burn xUSD
          </button>
        )}
      </form>
      {/* Loader Modal */}
      {showLoader && (
        <div className="loader-modal">
          <p>Loading...</p>
        </div>
      )}
    </section>
  );
};

export default SwapForm;
