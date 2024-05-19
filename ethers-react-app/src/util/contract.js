import { ethers } from 'ethers';
import LockArtifact from '../artifacts/contracts/Lock.sol/Lock.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const getContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, LockArtifact.abi, signer);
};

export default getContract;
