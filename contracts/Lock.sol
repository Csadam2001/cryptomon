// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; // Add this line

contract Lock is ERC721URIStorage, Ownable {
    struct Monster {
        uint256 id;
        uint256 health;
        uint256 mana;
        uint256 attack;
        uint256 defense;
        uint256 speed;
        uint256 level;
        uint256 experience;
        string uri;
    }

    Monster[] public monsters;

    event MonsterCreated(uint256 indexed monsterId, address owner);
    event BattleResult(uint256 indexed winnerId, uint256 indexed loserId, uint256 winnerNewHealth, uint256 loserNewHealth);
    event Attack(uint256 indexed attackerId, uint256 indexed defenderId, uint256 damage);

    constructor() ERC721("CryptoMon", "CMON") Ownable(msg.sender) {}

    function createMonster(
        uint256 health,
        uint256 mana,
        uint256 attack,
        uint256 defense,
        uint256 speed,
        string memory uri
    ) public onlyOwner {
        uint256 monsterId = monsters.length;
        monsters.push(Monster(monsterId, health, mana, attack, defense, speed, 1, 0, uri));
        _mint(msg.sender, monsterId);
        _setTokenURI(monsterId, uri);
        emit MonsterCreated(monsterId, msg.sender);
    }

    function attackMonster(uint256 attackerId, uint256 defenderId) public {
        require(ownerOf(attackerId) == msg.sender, "You must own the monster to command it.");
        require(ownerOf(defenderId) != address(0), "Defender must exist.");

        Monster storage attacker = monsters[attackerId];
        Monster storage defender = monsters[defenderId];

        uint256 attackPower = attacker.attack * 2; // Increase attack power
        uint256 defensePower = defender.defense;

        uint256 damage;
        if (attackPower > defensePower) {
            damage = attackPower - defensePower;
            defender.health = defender.health > damage ? defender.health - damage : 0;
            emit Attack(attackerId, defenderId, damage);
            if (defender.health == 0) {
                _burn(defenderId); // Remove the monster if it dies
                delete monsters[defenderId]; // Remove the monster from the array
            }
        } else {
            damage = defensePower - attackPower;
            attacker.health = attacker.health > damage ? attacker.health - damage : 0;
            emit Attack(defenderId, attackerId, damage);
            if (attacker.health == 0) {
                _burn(attackerId); // Remove the monster if it dies
                delete monsters[attackerId]; // Remove the monster from the array
            }
        }
        emit BattleResult(attackerId, defenderId, attacker.health, defender.health);
    }

    function levelUp(uint256 monsterId) public {
        require(ownerOf(monsterId) == msg.sender, "You must own the monster to level it up.");
        Monster storage monster = monsters[monsterId];
        uint256 requiredExperience = monster.level * 100; // Simplified experience requirements
        require(monster.experience >= requiredExperience, "Not enough experience to level up.");

        monster.level += 1;
        monster.health += 10; // Simplified attribute increases
        monster.mana += 5;
        monster.attack += 5;
        monster.defense += 5;
        monster.speed += 1;
        monster.experience = 0; // Reset experience after leveling up
    }

    function totalSupply() public view returns (uint256) {
        return monsters.length;
    }

    function getMonster(uint256 monsterId) public view returns (Monster memory) {
        require(monsterId < monsters.length, "Monster does not exist.");
        return monsters[monsterId];
    }

}