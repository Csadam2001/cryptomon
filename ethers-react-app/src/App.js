import React, { useEffect, useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config.js';

const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerMonster, setPlayerMonster] = useState(null);
  const [opponentMonster, setOpponentMonster] = useState(null);

  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        if (!window.ethereum) throw new Error('No Ethereum provider found');
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        const totalMonsters = await contract.totalSupply();
        const monsterArray = [];
        for (let i = 0; i < totalMonsters; i++) {
          const monster = await contract.getMonster(i);
          console.log(monster); // Log the monster object structure
          monsterArray.push({
            id: i,
            health: monster.health.toString(),
            mana: monster.mana.toString(),
            attack: monster.attack.toString(),
            defense: monster.defense.toString(),
            speed: monster.speed.toString()
          });
        }

        setMonsters(monsterArray);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMonsters();
  }, []);

  const handleBattle = async () => {
    if (!playerMonster || !opponentMonster) {
      alert('Please select both player and opponent monsters');
      return;
    }

    try {
      if (!window.ethereum) throw new Error('No Ethereum provider found');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.attackMonster(playerMonster.id, opponentMonster.id);
      await tx.wait();

      alert(`Battle between Monster #${playerMonster.id} and Monster #${opponentMonster.id} executed!`);

      const updatedMonster = await contract.getMonster(opponentMonster.id);
      setOpponentMonster({
        ...opponentMonster,
        health: updatedMonster.health.toString(),
        mana: updatedMonster.mana.toString(),
        attack: updatedMonster.attack.toString(),
        defense: updatedMonster.defense.toString(),
        speed: updatedMonster.speed.toString()
      });

      if (parseInt(updatedMonster.health.toString()) <= 0) {
        alert(`Monster #${opponentMonster.id} has died!`);
        setOpponentMonster(null);
        setMonsters(monsters.filter(monster => monster.id !== opponentMonster.id));
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading monsters...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div>
        <h2>Player's Monster</h2>
        {playerMonster ? (
          <div>
            <h3>Monster #{playerMonster.id}</h3>
            <p>Health: {playerMonster.health}</p>
            <p>Mana: {playerMonster.mana}</p>
            <p>Attack: {playerMonster.attack}</p>
            <p>Defense: {playerMonster.defense}</p>
            <p>Speed: {playerMonster.speed}</p>
          </div>
        ) : (
          <p>No player monster selected</p>
        )}
      </div>
      <div>
        <h2>Opponent's Monster</h2>
        {opponentMonster ? (
          <div>
            <h3>Monster #{opponentMonster.id}</h3>
            <p>Health: {opponentMonster.health}</p>
            <p>Mana: {opponentMonster.mana}</p>
            <p>Attack: {opponentMonster.attack}</p>
            <p>Defense: {opponentMonster.defense}</p>
            <p>Speed: {opponentMonster.speed}</p>
          </div>
        ) : (
          <p>No opponent monster selected</p>
        )}
      </div>
      <div>
        <h2>Monsters List</h2>
        {monsters.map((monster, index) => (
          <div key={index}>
            <h3>Monster #{monster.id}</h3>
            <p>Health: {monster.health}</p>
            <p>Mana: {monster.mana}</p>
            <p>Attack: {monster.attack}</p>
            <p>Defense: {monster.defense}</p>
            <p>Speed: {monster.speed}</p>
            <button onClick={() => setPlayerMonster(monster)}>Select as Player</button>
            <button onClick={() => setOpponentMonster(monster)}>Select as Opponent</button>
          </div>
        ))}
      </div>
      <button onClick={handleBattle}>Battle!</button>
    </div>
  );
};

export default App;
