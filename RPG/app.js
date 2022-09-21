const readline = require("readline-sync");

function opening() {
  console.log(
    "You are the lone survivor of downed flight 787. You awaken on a foreign island. There are bizarre sounds and an unknown smell to this place. You can barely make out an ocean, it appears to be approximately 200 yards away from the crash. All of a sudden you hear over a walkie-talkie a voice asking if there are any survivors.."
  );

  console.log("Hello, are there any survivors?");
}
opening();

const userName = readline.question(`What is your name? `);

console.log(
  `${userName}, there is a rescue boat waiting on the beach 200 yards to the South. Head in that direction. `
);

function intro() {
  const introAnswer = readline.question(
    "Shall we begin?" +
      " " +
      "press 'y' followed by the enter key to begin" +
      " "
  );
  if (introAnswer === "y") {
    console.log(`Let's GO!`);
  } else {
    console.log(
      `Do you want to stay here and die? press 'y' followed by enter to begin traveling to rescue boat `
    );
    intro();
  }
}

intro();

console.log(
  "Here are a few things you need to know on our journey.\n If you want to see your players status press 'p'.\n To walk press 'w' followed by the enter key.\n To fight press 'f' followed by the enter key.\n To run press 'r' followed by the enter key.\n If you choose to run you will have a 50% chance of escaping.\n If you choose to fight there are different scenarios.\n 1. You can be dealt a random amount of damage to your health.\n 2. You can deal random amount of damage to enemy.\n 3. All fights are to the death\n 4. If health reaches 0, game is over.\n 5. If enemies health reaches 0, you win the fight and may have health points added or a special inventory item might be awarded."
);

const enemies = [
  {
    name: "Mosquito",
    damage: 2,
    health: 5,
    hp: 2,
    item: "green ruby",
  },
  {
    name: "Snake",
    damage: 10,
    health: 20,
    hp: 10,
    item: "red ruby",
  },
  {
    name: "Baboon",
    damage: 20,
    health: 40,
    hp: 20,
    item: "diamond",
  },
  {
    name: "Jaguar",
    damage: 30,
    health: 50,
    hp: 30,
    item: "gold",
  },
];

let distance = 200;
let health = 100;
let inventory = [];

let enemy = 0;
let animal = enemies[enemy].name;
let animalHealth = enemies[enemy].health;
let damage = 0;

beginning();

function beginning() {
  const firstAction = readline.question(
    `Your distance remaining is: ${distance} yards. What do you want to do now? `
  );
  if (firstAction === "p") {
    statusFunc();
  } else if (firstAction === "w") {
    walkFunc();
  } else {
    beginning();
  }
}
//////////////////STATUS/////////////////////
function statusFunc() {
  console.log(
    `Name: ${userName}, Health: ${health}, Inventory: ${inventory}, Distance remaining: ${distance}`
  );
  beginning();
}

// ///////////////////DECISION/////////////////////

function decisionFunc() {
  enemy = Math.floor(Math.random() * enemies.length);
  animal = enemies[enemy].name;
  animalHealth = enemies[enemy].health;
  let decision = readline.question(
    `A ${animal} has appeared and it's health is ${animalHealth}, do you want to fight or run? `
  );

  if (decision === "r") {
    runFunc();
  } else if (decision === "f") {
    battleFunc();
  } else {
    runFunc();
  }
}

////////////////RUNNING/////////////////////

function runFunc() {
  const running = Math.floor(Math.random() * 101);
  if (running <= 50) {
    console.log("You escaped!");
    beginning();
  } else {
    console.log("You couldn't escape, you must fight it!");
    battleFunc();
  }
}

////////////////////FIGHTING////////////////////////
function battleFunc() {
  while (health > 0 && animalHealth > 0) {
    const fightAnswer = readline.question(`Press 'f' to attack `);
    if (fightAnswer === "f") {
      userFightFunc();
    } else {
      battleFunc();
    }
    if (animalHealth > 0) {
      enemyFightFunc();
      console.log(
        `You have ${health} health remaining, Enemy has ${animalHealth} health remaining`
      );
    } else {
      console.log(`You defeated ${animal}! `);
      healthOrInventory();
    }
  }

  function healthOrInventory() {
    const healthOrInventory = readline.question(
      `If you want to add ${enemies[enemy].hp} health, press 'h' followed by enter. If you want to keep the loot press 'l' followed by enter. `
    );
    if (healthOrInventory === "h") {
      health = health + enemies[enemy].hp;
      console.log(`${enemies[enemy].hp} health has been added!`);
      animalHealth = enemies[enemy].health;
      enemy = Math.floor(Math.random() * enemies.length);
      beginning();
    } else if (healthOrInventory === "l") {
      inventory.push(enemies[enemy].item);
      console.log(`${enemies[enemy].item} has been added to your inventory`);
      animalHealth = enemies[enemy].health;
      enemy = Math.floor(Math.random() * enemies.length);
      beginning();
    }
  }
}

function userFightFunc() {
  damage = Math.floor(Math.random() * 11);
  animalHealth = animalHealth - damage;
  console.log(`You attacked for ${damage} amount of damage.`);
  if (animalHealth > 0) {
    return animalHealth;
  } else {
    return console.log(`The enemy has 0 health remaining`);
  }
}

function enemyFightFunc() {
  damage = Math.floor(Math.random() * 11);
  health = health - damage;
  console.log(`Enemy attacked you for ${damage} amount of damage`);
  if (health > 0) {
    return health;
  } else {
    console.log(`You were killed by ${animal}`);
    gameOver();
  }
}

/////////////////WALKING//////////////////////
function walkFunc() {
  const appear = Math.floor(Math.random() * 101);
  if (appear <= 25) {
    decisionFunc();
  } else {
    if (health > 0 && distance < 10) {
      console.log("You have been rescued!");
      gameOver();
    } else if (health === 0 && distance > 0) {
      console.log("You Died Game Over");
      gameOver();
    } else if (health > 0 && distance > 0) {
      for (let i = 0; i < 10; i++) {
        distance--;
      }
      beginning();
      return distance;
    }
  }
}

function gameOver() {
  console.log(`Game Over!`);
  console.log(
    `Name: ${userName}, Health: ${health}, Inventory: ${inventory}, Distance remaining: ${distance}`
  );
  health = 100;
  distance = 200;
  const playAgain = readline.question(
    `Do you want to play again? If yes, press'y' followed by enter. If no, press 'n' followed by enter `
  );

  if (playAgain === "y") {
    beginning();
  } else if (playAgain === "n") {
    console.log("Thanks for playing! Created by Tyler Alcala");
  }
  gameOver();
}
