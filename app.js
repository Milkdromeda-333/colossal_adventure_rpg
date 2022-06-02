const readline = require("readline-sync")

let userAction
const gamer = {
    name: "gamer",
    inventory: 0,
    courage: 100,
    isMonsterPresent: false,
    stats() {
        console.log(`\n${this.name} stats-- \n inventory: ${this.inventory} \n courage: ${this.courage}`)
    }
}

// this function returns a random number between 1 and 4
function getrandomNum() {
    randomNum = Math.floor(Math.random() * 3) + 1
    return randomNum
}

function walk() {
    let randomNum = getrandomNum()
    if (randomNum === 1) {
        encounter()
    }
    while (gamer.isMonsterPresent === false) {
        userAction = readline.question("\n...Press W to walk. or P to check stats ").toUpperCase()
        if (userAction === "W") {
            randomNum = getrandomNum()
            if (randomNum === 1) {
                gamer.isMonsterPresent = true
                encounter()
            }
        } else if (userAction === "P") {
            gamer.stats()
        }
    }
    if (gamer.isMonsterPresent === true) {
        encounter()
    }
}

function encounter() {
    gamer.isMonsterPresent = true;
    enemyObj = getEnemy()
    userAction = readline.question(`\nThen, ${gamer.name} encountered ${enemyObj.name}!\n"${enemyObj.phrase}"\nFight or run? (F or R) `).toUpperCase()
    switch (userAction) {
        case "F":
            fight(enemyObj)
            break;
        case "R":
            const chanceOfRunning = Math.floor(Math.random() * 3)// (0, 2)
            if (chanceOfRunning === 1) {
                console.log(`${gamer.name} heard ${enemy.name} giggling behind'em "hehehehhehe like I said ${enemyObj.phrase}"`)
                run()
            } else {
                console.log(`\n${gamer.name} failed to escape and took dicouragement!`)
                randomDamage = Math.ceil(Math.random() * 50) + 1
                gamer.courage -= randomDamage
                fight(enemyObj)
            }
    }
}

function run() {
    randomDamage = Math.ceil(Math.random() * 50) + 1
    gamer.courage -= randomDamage
    gamer.isMonsterPresent = false
    console.log(`\${gamer.name} took ${randomDamage} points of discouragement while fleeing! `)
    walk()
}

const enemy = [
    {
        name: "Tree stump with a sign",
        phrase: "You smell bad.",
        courage: 30,
        reward: 1
    },
    {
        name: "Talking Bush",
        phrase: "You Ugly, fat-smelling fathead!",
        courage: 30,
        reward: 1
    },
    {
        name: "Darren",
        phrase: "I will lay you to waste.................................................................................................................................................................",
        courage: 60,
        reward: 2
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

let isFighting = false
function fight(enemy) {
    isFighting = true
    let enemyCourage = enemy.courage
    let damage = getDamage()
    gamer.courage -= damage
    console.log(`\n${enemy.name} then dealt ${damage} damage.`)
    while (isFighting === true) {
        userAction = readline.question("\nPress A to attack! ").toUpperCase()
        while (!userAction || userAction !== "A") {
            userAction = readline.question("\nPress A to attack!").toUpperCase()
        }
        if (userAction === "A") {
            if (gamer.courage > 0) {
                damage = getDamage()
                enemyCourage -= damage
                console.log(`\n${gamer.name} dealt ${damage} damage!`)
                console.log(`${gamer.name}: ${gamer.courage} courage | ${enemy.name}: ${enemyCourage} courage`)
            }
            if (enemyCourage > 0) {
                damage = getDamage()
                gamer.courage -= damage
                console.log(`\n${enemy.name} dealt ${gamer.name} ${damage} damage!`)
            }
        }

        if (gamer.courage <= 0) {
            console.log(`\n${gamer.name} became too discouraged and ran home without their pizza. 😢🍽️`)
            process.exit()
        }
        if (enemyCourage <= 0) {
            gamer.inventory += enemy.reward
            if (gamer.inventory === 3) {
                console.log(`\n${gamer.name} collected enough pizza tokens for a free lunch that day. The End 😄🍕🤰`)
                process.exit()
            }
            const awardedCourage = getDamage()
            console.log(`\n${gamer.name} beat ${enemy.name}, recieved ${awardedCourage} courage, and recieved ${enemy.reward} pizza coupon(s)\n${gamer.name} is walking again.....`)
            isFighting = !isFighting
            walk()
        }
    }
}

// Game play

gamer.name = readline.question("Once upon a time you were walking through the 'Yellow Forest' in the land of Ooo....erm, what's your name? ").toUpperCase()

userAction = readline.question(`\nVery well, then ${gamer.name}. You were on your way for a pizza at Pizza Sally's when you realized this forest is a dangerous one!\nKeep your courage as you trek to your lunch!, and maybe collect 3 pizza coupons from the tree people as you go... Press W to walk. `).toUpperCase()


// This will generate a random number and depending on the number will make an enemey appear. and it will run enemy encounter funcion. that will ask if they wanna fight or run. if they runtheres a chance they will not get away.
if (userAction === "W") {
    const randomNum = getrandomNum()
    if (randomNum === 1) {
        encounter()
    } else {
        walk()
    }
} else if (userAction === "P") {
    gamer.stats()
}