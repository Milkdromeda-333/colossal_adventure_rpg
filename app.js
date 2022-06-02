const readline = require("readline-sync")

let userAction
const gamer = {
    name: "gamer",
    inventory: "",
    hp: 100,
    isMonsterPresent: false
}

// this function returns a random number between 1 and 3
function getrandomNum() {
    randomNum = Math.floor(Math.random() * 2) + 1
    return randomNum
}

if (gamer.hp <= 0) {
    console.log(`${gamer.name} has perished. 😢`)
}

function walk() {
    let randomNum = getrandomNum()
    if (randomNum === 1) {
        encounter()
    }
    while (gamer.isMonsterPresent === false) {
        userAction = readline.question("...Press W to walk. ").toUpperCase()
        if (userAction === "W") {
            randomNum = getrandomNum()
            if (randomNum === 1) {
                gamer.isMonsterPresent === true
                encounter()
            }
        }
    }
    if (gamer.isMonsterPresent === true) {
        encounter()
    }
}

function encounter() {
    gamer.isMonsterPresent = true;
    enemyObj = getEnemy()
    userAction = readline.question(`You have encountered ${enemyObj.name}! Fight or run? (F or R) `).toUpperCase()
    switch (userAction) {
        case "F":
            fight(enemyObj)
            break;
        case "R":
            const chanceOfRunning = Math.floor(Math.random() * 3)// (0, 2)
            if (chanceOfRunning === 1) {
                run()
            } else {
                console.log(`${gamer.name} failed to escape and took damge!`)
                randomDamage = Math.ceil(Math.random() * 50) + 1
                gamer.hp -= randomDamage
                fight(enemyObj)
            }
    }
}

function run() {
    randomDamage = Math.ceil(Math.random() * 50) + 1
    gamer.hp -= randomDamage
    gamer.isMonsterPresent = false
    console.log(`You took ${randomDamage} points of damage while fleeing! `)
    walk()
}

const enemy = [
    {
        name: "enemy1",
        hp: 50
    },
    {
        name: "enemy2",
        hp: 30,
    },
    {
        name: "enemy3",
        hp: 40
    }
]
// this function returns a random enemy index to the encounter function
function getEnemy() {
    let num = Math.floor(Math.random() * 3) // (0, 2)
    chosenEnemy = enemy[num]
    return chosenEnemy
}

// this function returns a random number from (hopefully) 1 to 20
function getDamage() {
    let damage = Math.floor(Math.random() * 20) + 1
    return damage
}

function fight(enemy) {
    let enemyHp = enemy.hp
    let initialDamage = getDamage()
    gamer.hp -= initialDamage
    console.log(`${enemy.name} has dealt ${initialDamage} damage!`)
    while (gamer.hp > 0 || enemyHp > 0) {
        userAction = readline.question("Press A to attack! ").toUpperCase()
        while (!userAction || userAction !== "A") {
            userAction = readline.question("Press A to attack!").toUpperCase()
        }
        if (userAction === "A") {
            let damageA = getDamage()
            enemyHp -= damageA
            console.log(`${gamer.name} dealt ${damageA} damage!`)
            console.log(`${gamer.name}: ${gamer.hp} hp | ${enemy.name}: ${enemyHp} hp`)


            let damageB = getDamage()
            gamer.hp -= damageB
            console.log(`${enemy.name} dealt ${gamer.name} ${damageB} damage!`)
        }
    }
    if (gamer.hp <= 0) {
        console.log(`${gamer.name} has unfortunately perished. 😢`)
    }
    if (enemyHp <= 0) {
        console.log(`You beat ${enemy.name}!`)
        walk()
    }

}

gamer.name = readline.question("You are walking through a dense forest somewhere in the galaxy of Andromeda....erm, what's your name? ")

userAction = readline.question(`Very well, then ${gamer.name}. Press W to walk. `).toUpperCase()


// This will generate a random number and depending on the number will make an enemey appear. and it will run enemy encounter funcion. that will ask if they wanna fight or run. if they runtheres a chance they will not get away.
if (userAction === "W") {
    const randomNum = getrandomNum()
    if (randomNum === 1) {
        encounter()
    } else {
        walk()
    }
}



// function randomEvent() {
//     const num = Math.floor(Math.ciel() * 3)
//     // event 1
//     switch (num) {
//         case "1":
//             let answer = readline.question("An ugly hippo-dog-rag-face scuttles beside you. Do you want to ask it for money? Y or N? ");
//             if (answer === "N") {

//             }
//     }
// }
// this function generates a random number and if its 3 monster returns true and it will send them to the encounter function
// function walk() {
//     const randomNum = Math.floor(Math.ciel() * 3) // 0, 3
//     if (randomNum === 0) {
//         monsterEncounter()
//     } else {
//         userAction = readline.question("Nothing yet...... keep walking? Press W. ")
//     }
// }

// if (gamer.courage > 0) {
//     userAction = readline.question("Press W to walk.")
//     if (userAction === "W") {
//         walk();
//     }
// } else {
//     console.log(`${gamer.name} has perished. 😢`)
// }

// gamer.name = readline.question("You are walking through a dense forest somewhere in the galaxy of Andromeda....erm, what's your name? ")
// userAction = readline.question(`Very well, then ${gamer.name}. Press W to walk. `)

// this function asks tou to walk and if you encounter something sends you to that function
// function walk() {
//     userAction = readline.question("Nothing yet...Press W to walk. ")
//     if (userAction === "W") {
//         const randomNum = getrandomNum()
//         if (randomNum === 1) {
//             encounter()
//         } else {

//         }
//     }
// }