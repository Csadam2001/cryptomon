import React, { useEffect, useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config.js';

const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        if (!window.ethereum) throw new Error('No Ethereum provider found');
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        console.log('Provider:', provider);
        console.log('Signer:', signer);
        
        console.log('Contract:', contract);

        const totalMonsters = await contract.totalSupply();
        console.log('Total Monsters:', totalMonsters.toString());

        const monsterArray = [];
        for (let i = 0; i < totalMonsters; i++) {
          const monster = await contract.getMonster(i);
          monsterArray.push(monster);
        }

        setMonsters(monsterArray);
      } catch (error) {
        console.error('Error fetching monsters:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMonsters();
  }, []);

  if (loading) return <p>Loading monsters...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {monsters.map((monster, index) => (
        <div key={index}>
          <h2>Monster #{monster.id.toString()}</h2>
          <p>Health: {monster.health.toString()}</p>
          <p>Mana: {monster.mana.toString()}</p>
          <p>Attack: {monster.attack.toString()}</p>
          <p>Defense: {monster.defense.toString()}</p>
          <p>Speed: {monster.speed.toString()}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
