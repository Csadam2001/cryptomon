import { BrowserProvider, Contract } from 'ethers';
import LockArtifact from '../artifacts/contracts/Lock.sol/Lock.json'; // Adjust the path based on the new location

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const getContract = () => {
  const provider = new BrowserProvider(window.ethereum);
  const signer = provider.getSigner();
  return new Contract(contractAddress, LockArtifact.abi, signer);
};

export default getContract;
