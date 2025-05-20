import { Contract, ethers } from "ethers";
import { erc20Contract } from "./contract";
import { rpcUrl } from "@/config/web3.config";

declare global {
    interface Window {
      ethereum?: any;
    }
  }
  
const ethereumProvider = typeof window !== "undefined" ? window.ethereum : null;

export async function ensureEthereumAvailable(): Promise<void> {
    if (!ethereumProvider) {
      throw new Error(
        "No Ethereum provider found. Please install an EVM wallet (e.g., MetaMask)."
      );
    }
  
    if (typeof ethereumProvider.request !== "function") {
      throw new Error(
        "Ethereum provider does not support 'request' method. Ensure MetaMask is up to date."
      );
    }
}


export async function getSigner(): Promise<ethers.Signer> {
    await ensureEthereumAvailable();
  
    try {
      const accounts: string[] = await ethereumProvider.request({
        method: "eth_accounts",
      });
  
      if (accounts?.length > 0) {
        const provider: ethers.BrowserProvider = new ethers.BrowserProvider(
          ethereumProvider
        );
  
        return provider.getSigner();
      } else {
        const fallbackProvider: ethers.JsonRpcProvider =
          new ethers.JsonRpcProvider(rpcUrl);
        const randomWallet: ethers.HDNodeWallet = ethers.Wallet.createRandom();
  
        return randomWallet.connect(fallbackProvider);
      }
    } catch (error) {
      console.error("Error getting signer:", error);
      throw new Error("Failed to retrieve a signer.");
    }
}

export async function getERC20Contract(): Promise<Contract> {
    await ensureEthereumAvailable();
  
    try {
      const signer: ethers.Signer = await getSigner();
  
      return new ethers.Contract(
        erc20Contract.contractAddr,
        erc20Contract.contractABI,
        signer
      );
    } catch (error) {
      console.error("Error initializing contract:", error);
      throw new Error("Failed to initialize the ERC20 contract.");
    }
  }
  