/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/

function GameObject (obj) {
  this.createdAt = obj.createdAt;
  this.name = obj.name;
  this.dimensions = obj.dimensions;
}

GameObject.prototype.destroy = function() {
  return `${this.name} was removed from the game.`
}

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats (attributes) {
  GameObject.call(this, attributes);
  this.healthPoints = attributes.healthPoints;
}

// links GameObject protos to CharacterStats
CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function () {
  return `${this.name} took damage.`;
}

// const people = new CharacterStats(1324);

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
 
// function takes an object so restructure arguments referencing
function Humanoid (specs) {
  CharacterStats.call(this, specs);
  this.team = specs.team;
  this.weapons = specs.weapons;
  this.language = specs.language;
}

Humanoid.prototype = Object.create(CharacterStats.prototype, this.destroy, this.takeDamage);

Humanoid.prototype.greet = function () {
  return `${this.name} offers a greeting in ${this.language}.`;
}


const beast = new Humanoid('blue', {primary: 'sword', seconday: 'dagger', uniform: 'cloak'}, 'Vietnamese');

console.log(beast);

/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:


const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1,
  },
  healthPoints: 5,
  name: 'Bruce',
  team: 'Mage Guild',
  weapons: [
    'Staff of Shamalama',
  ],
  language: 'Common Tongue',
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2,
  },
  healthPoints: 15,
  name: 'Sir Mustachio',
  team: 'The Round Table',
  weapons: [
    'Giant Sword',
    'Shield',
  ],
  language: 'Common Tongue',
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4,
  },
  healthPoints: 10,
  name: 'Lilith',
  team: 'Forest Kingdom',
  weapons: [
    'Bow',
    'Dagger',
  ],
  language: 'Elvish',
});

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


console.log('----------------------');

// Stretch task: 
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  
// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villain and one a hero and fight it out with methods!

function Villain (specs) {
  Humanoid.call(this, specs);
  this.damage = specs.damage;
  this.catchPhrase = specs.catchPhrase;
}

Villain.prototype.attack = function (heroName) {
  const attackStat = Math.round(Math.random()*this.damage);

  if (this.healthPoints > 0) {
    if ((heroName.healthPoints - attackStat) > 0) {
      heroName.healthPoints -= attackStat;

      console.log(`${heroName.name} has been hit with ${this.weapons[Math.floor(Math.random()*this.weapons.length)]} causing ${attackStat} damage and now has ${heroName.healthPoints} health remaining!`);

      console.log(`${heroName.name} says: '${heroName.catchPhrase}'`);

      return `${this.name} attacked ${heroName} with ${this.weapons[Math.round(Math.random*this.weapons.length)]}`;
    } else {
      console.log(`${heroName.name} has been defeated by the infamous ${this.name}.`);
    }
  }
}

function Hero (specs) {
  Humanoid.call(this, specs);
  this.damage = specs.damage;
  this.catchPhrase = specs.catchPhrase;
}

Hero.prototype.attack = function (villainName) {
  const attackStat = Math.round(Math.random()*this.damage);

  if (this.healthPoints > 0) {
    if ((villainName.healthPoints - attackStat) > 0) {
      villainName.healthPoints -= attackStat;
    
      console.log(`${villainName.name} has been hit with ${this.weapons[Math.round(Math.random()*this.weapons.length)]} causing ${attackStat} damage and now has ${villainName.healthPoints} health remaining!`);
    
      console.log(`${villainName.name} says: '${villainName.catchPhrase}'`);
    
      return `${villainName.name} attacked ${this.name}`;
    } else {
      console.log(`${villainName.name} has been defeated!`);
    }
  } else {
    
  }
}

const superMan = new Hero({
  createdAt: new Date(),
  name: 'SuperMan',
  damage: 250,
  dimensions: {
    length: 1,
    width: 2,
    height: 4,
  },
  healthPoints: 1000,
  team: 'Earth Protectors',
  weapons: [
    'Punch',
    'Super Hot',
  ],
  language: 'Kryptonian',
  catchPhrase: 'Darn you demon!',
  defeat: 'You will never see the light of day'
});

const polarBear = new Villain({
  createdAt: new Date(),
  name: 'Polar Bear',
  damage: 380,
  dimensions: {
    length: 1,
    width: 2,
    height: 4,
  },
  healthPoints: 1000,
  team: 'Earth Protectors',
  weapons: [
    'Swipe',
    'Bear Hug',
  ],
  language: 'Kryptonian',
  catchPhrase: 'Mrrrrnnnnnmmhhhhaa',
  defeat: '*thud*'
});

polarBear.attack(superMan);
superMan.attack(polarBear);
polarBear.attack(superMan);
superMan.attack(polarBear);
polarBear.attack(superMan);
superMan.attack(polarBear);
polarBear.attack(superMan);
superMan.attack(polarBear);
polarBear.attack(superMan);
superMan.attack(polarBear);
polarBear.attack(superMan);
superMan.attack(polarBear);
polarBear.attack(superMan);
superMan.attack(polarBear);
polarBear.attack(superMan);
superMan.attack(polarBear);
polarBear.attack(superMan);
superMan.attack(polarBear);
polarBear.attack(superMan);
superMan.attack(polarBear);
polarBear.attack(superMan);
superMan.attack(polarBear);
polarBear.attack(superMan);
superMan.attack(polarBear);
polarBear.attack(superMan);
superMan.attack(polarBear);
polarBear.attack(superMan);
superMan.attack(polarBear);
polarBear.attack(superMan);