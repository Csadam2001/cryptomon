import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import LockABI from './LockABI.json';  // A helyes elérési útvonalra figyelj oda!

function App() {
  const [owner, setOwner] = useState('');
  const [unlockTime, setUnlockTime] = useState('');

  // Egy függvény, amely inicializálja a provider, contract és meghívja a smart contract függvényeket
  const init = async () => {
    try {
      // A web3 provider beállítása a felhasználó Ethereum walletjével
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // A felhasználótól származó összes fiók kérése
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      // A smart contract példányosítása az ABI, cím és signer segítségével
      const contract = new ethers.Contract(
        'YOUR_CONTRACT_ADDRESS_HERE', // Szerződés címe
        LockABI,
        signer
      );

      // Lekérdezések a smart contracttól
      const ownerAddress = await contract.owner();
      const time = await contract.unlockTime();

      // Állapotok frissítése a lekérdezett adatokkal
      setOwner(ownerAddress);
      setUnlockTime(new Date(time.toNumber() * 1000).toLocaleString()); // UNIX timestamp konvertálása dátummá
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Az init függvény meghívása a komponens betöltésekor
  useEffect(() => {
    init();
  }, []);

  return (
    <div className="App">
      <h1>Cryptomon Contract Interface</h1>
      <p><strong>Contract Owner:</strong> {owner}</p>
      <p><strong>Unlock Time:</strong> {unlockTime}</p>
    </div>
  );
}

export default App;
