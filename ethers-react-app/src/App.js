const React = require('react');
const { useEffect, useState } = require('react');
const getContract = require('./utils/contract');

const App = () => {
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    const fetchMonsters = async () => {
      const contract = getContract();
      const totalMonsters = await contract.totalSupply();
      const monsterArray = [];

      for (let i = 0; i < totalMonsters; i++) {
        const monster = await contract.monsters(i);
        monsterArray.push(monster);
      }
        console.log(monsterArray);
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      setMonsters(monsterArray);
    };

    fetchMonsters();
  }, []);

  const handleBattle = async (attackerId, defenderId) => {
    const contract = getContract();
    await contract.attackMonster(attackerId, defenderId);
  };

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
          <button onClick={() => handleBattle(monster.id, 1)}>Attack</button>
        </div>
      ))}
    </div>
  );
};

module.exports = App;
