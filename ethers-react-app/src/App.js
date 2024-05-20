import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config.js'; // Import the configuration

const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        if (!window.ethereum) throw new Error('No Ethereum provider found');
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

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
          <h2>Monster #{monster.id}</h2>
          <p>Health: {monster.health}</p>
          <p>Mana: {monster.mana}</p>
          <p>Attack: {monster.attack}</p>
          <p>Defense: {monster.defense}</p>
          <p>Speed: {monster.speed}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
