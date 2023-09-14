import { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import web3 from "web3";

function SignPage() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");

  const getAccount = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  };

  const connectWallet = async () => {
    await getAccount();
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    setProvider(provider);
    setSigner(signer);
  };

  const signMessage = async () => {
    if (!signer) {
      console.error("No signer available");
      return;
    }
    try {
      const signedMessage = await signer.signMessage(message);
      setSignedMessage(signedMessage);
    } catch (error) {
      console.error("Error signing message:", error);
    }
  };

  getAccount();

  return (
    <div>
      <div>
        <label>Connected account:</label> {account}
      </div>
      <button onClick={connectWallet}>Connect Wallet</button>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message to sign"
        />
        <button onClick={signMessage}>Sign Message</button>
      </div>
      {signedMessage && (
        <div>
          <h3>Signed Message</h3>
          <p>{signedMessage}</p>
        </div>
      )}
    </div>
  );
}

export default SignPage;
