import { useState, useEffect } from "react";
import { ethers } from "ethers";

const useMetaMask = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      const newProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(newProvider);

      window.ethereum.on("accountsChanged", async (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          const newSigner = await newProvider.getSigner();
          setSigner(newSigner);
        } else {
          disconnectWallet();
        }
      });
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);

      if (provider) {
        const newSigner = await provider.getSigner();
        setSigner(newSigner);
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  const disconnectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({
          method: "wallet_revokePermissions",
          params: [
            {
              eth_accounts: {},
            },
          ],
        });
      }
      setAccount(null);
      setSigner(null);
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  return { account, connectWallet, disconnectWallet, provider, signer };
};

export default useMetaMask;