import React, { useEffect, useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config.js';
import './App.css';

const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attackLogs, setAttackLogs] = useState([]);
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        if (!window.ethereum) throw new Error('No Ethereum provider found');
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        const address = await signer.getAddress();
        setUserAddress(address);

        const totalMonsters = await contract.totalSupply();
        const monsterArray = [];

        for (let i = 0; i < totalMonsters; i++) {
          const monster = await contract.getMonster(i);
          monsterArray.push(monster);
        }

        setMonsters(monsterArray);

        // Fetch attack logs
        const filter = contract.filters.BattleResult();
        const logs = await contract.queryFilter(filter);
        const parsedLogs = logs.map(log => ({
          attackerId: log.args.attackerId.toString(),
          defenderId: log.args.defenderId.toString(),
          damage: log.args.damage.toString(),
          newHealth: log.args.newHealth.toString(),
        }));
        setAttackLogs(parsedLogs);
      } catch (error) {
        console.error('Error fetching monsters:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMonsters();
  }, []);

  const handleCreateMonster = async () => {
    try {
      if (!window.ethereum) throw new Error('No Ethereum provider found');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.createMonster(100, 50, 20, 15, 10, 'https://example.com/monster-metadata');
      await tx.wait();

      // Refresh monsters data after creating a new one
      const totalMonsters = await contract.totalSupply();
      const monsterArray = [];

      for (let i = 0; i < totalMonsters; i++) {
        const monster = await contract.getMonster(i);
        monsterArray.push(monster);
      }

      setMonsters(monsterArray);
    } catch (error) {
      console.error('Error creating monster:', error);
      setError(error.message);
    }
  };

  const handleBattle = async () => {
    try {
      if (!window.ethereum) throw new Error('No Ethereum provider found');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Ellenőrizze a tulajdonjogot
      const ownerOfMonster0 = await contract.ownerOf(0);
      const ownerOfMonster1 = await contract.ownerOf(1);

      if (ownerOfMonster0.toLowerCase() !== userAddress.toLowerCase() || 
          ownerOfMonster1.toLowerCase() !== userAddress.toLowerCase()) {
        throw new Error('You must own the monster to command it.');
      }

      const tx = await contract.attackMonster(0, 1); // Use actual monster IDs
      await tx.wait();

      // Refresh monsters data after battle
      const totalMonsters = await contract.totalSupply();
      const monsterArray = [];

      for (let i = 0; i < totalMonsters; i++) {
        const monster = await contract.getMonster(i);
        monsterArray.push(monster);
      }

      setMonsters(monsterArray);
    } catch (error) {
      console.error('Error executing battle:', error);
      setError(error.message);
    }
  };

  if (loading) return <p>Loading monsters...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="monsters-container">
        {monsters.slice(0, 2).map((monster, index) => (
          <div key={index} className="monster-card">
            <h2>Monster #{monster.id.toString()}</h2>
            <p>Health: {monster.health.toString()}</p>
            <p>Mana: {monster.mana.toString()}</p>
            <p>Attack: {monster.attack.toString()}</p>
            <p>Defense: {monster.defense.toString()}</p>
            <p>Speed: {monster.speed.toString()}</p>
          </div>
        ))}
      </div>
      <button onClick={handleCreateMonster}>Create Monster</button>
      <button onClick={handleBattle}>Battle</button>
      <h2>Battle Logs</h2>
      {attackLogs.map((log, index) => (
        <div key={index}>
          <p>Attacker ID: {log.attackerId}, Defender ID: {log.defenderId}, Damage: {log.damage}, New Health: {log.newHealth}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
