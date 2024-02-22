// Add 100 points each time you listen to Simon. If you hold down space on red and simon didn't tell you to, your points go up, but slower than if it was green

const countdown = document.getElementById('countdown')
const overlay = document.getElementById('overlay')
const errorTimeTest = document.getElementById('errorTimeTest')
const gameOverState = document.getElementById('gameOver')
const restart = document.getElementById('restartButton')
const highScore = document.getElementById('highScore')
const hideRules = document.getElementById('hideRules')
const tutorial = document.getElementById('tutorial')
const testButton = document.getElementById('testButton')
const checkStatus = document.getElementById('statusCheck')
const light = document.getElementById("light")
const simon = document.getElementById("lightAlert")
const pointsText = document.getElementById('points')


// rgb(38, 222, 96) is green
// rgb(210, 51, 51) is red

let lightColor = " "
let simonSaid = false
let simonSays = ""
let says = 0
let silent = 0
let pointNum = 0
let finalScore = 0
let highscore = 0
let gameStatus = false
let redStart = 7;
let redMin = 3;
let redMax = 7;
let greenStart = 6;
let greenMin = 2;
let greenMax = 6;
let subtraction = 0.2
let roomForError = 1.5
let errorTimer = 75
let newErrorTimer = 75
let errorSubtract = 1
let keyState = {};
let startTime = 3


// testButton.addEventListener('click', ()=> {
//     lightSwitch()
//     simonDecider()
// })

// checkStatus.addEventListener('click', ()=> {
//     didSimonSay()
// })

testButton.addEventListener('click', ()=> {
    startingTimer()
})

restart.addEventListener('click', ()=> {
    restartGame()
})

hideRules.addEventListener('click', ()=> {
    hideRule()
})

// function lightSwitch() {
//     if (light.style.backgroundColor === "rgb(158, 121, 121)") {
//         lightColor = "rgb(210, 51, 51)"
//         light.style.backgroundColor = lightColor
//     } else if (light.style.backgroundColor === "rgb(210, 51, 51)") {
//         lightColor = "rgb(38, 222, 96)"
//         light.style.backgroundColor = lightColor
//     } else {
//         lightColor = "rgb(210, 51, 51)"
//         light.style.backgroundColor = lightColor
//     }
// }

// Step 1 done

function simonDecider() {
    x = (Math.floor(Math.random() * 2) == 0);
    if(x) {
        simonSays = "Simon says:"
        simon.innerText = simonSays
    	console.log("Simon says");
        simonSaid = true
    } else {
        simonSays = ""
        simon.innerText = simonSays
        console.log("Simon silent");
        simonSaid = false
    }
}

// function didSimonSay() {
//     if (simonSaid === false && light.style.backgroundColor === "rgb(210, 51, 51)") {
//         console.log("Well Done! Light was red and simon didn't speak");
//         pointNum += 1000
//         pointsText.innerText = pointNum
//     } else if (simonSaid === true && light.style.backgroundColor === "rgb(210, 51, 51)") {
//         console.log("Game Lost: Light was red and simon spoke");
//         gameOver()
//     } else if (simonSaid === false && light.style.backgroundColor === "rgb(38, 222, 96)") {
//         console.log("Game Lost: Light was green and simon didn't speak");
//         gameOver()
//     } else if (simonSaid === true && light.style.backgroundColor === "rgb(38, 222, 96)") {
//         console.log("Well Done! Light was green and simon spoke");
//         pointNum += 1000
//         pointsText.innerText = pointNum
//     }
// }
/* 
    Step 2: 

        Make a function that checks if Simon is active or not.
*/

// testButton.addEventListener('click', ()=> {
//     startingTimer()
// })

// restart.addEventListener('click', ()=> {
//     restartGame()
// })

hideRules.addEventListener('click', ()=> {
    hideRule()
})

function hideRule() {
    if (tutorial.style.display === "none"){
        tutorial.style.display = "block"
        console.log("rules hidden");
    } else {
        tutorial.style.display = "none"
        console.log("rules displayed");
    }
}   

function gameStatusCheck() {
    if (gameStatus === false) {
        console.log("Game staus is false");
    } else if (gameStatus === true) {
        console.log("Game status is true");
    }
}

gameStatusCheck()

window.addEventListener('keydown',keyDown,true);

function keyDown(e) {
    keyState[e.code] = true;
}

window.addEventListener('keyup',(e) => {
    keyState[e.code] = false;
},true);

// function keyStateCheck() {
//     if (keyState["Space"] && color === "rgb(38, 222, 96)" && simonSaid === true){
//         addPoint()
//     } else if (keyState["Space"] && color == "rgb(210, 51, 51)" && errorTimer >= 1 && simonSaid === false) {
//         // dont forget to create an "addPointRed" with a smaller value
//         pointNum--
//         pointsText.innerText = pointNum
//         pointsText.style.color = "rgb(210, 51, 51)"
//     } else if (keyState["Space"] && color == "rgb(210, 51, 51)" && errorTimer <= 0) {
//         gameOver()
//     } else {pointsText.style.color = "rgb(0, 0, 0)"}
// }

function keyStateCheck() {
    if (keyState["Space"] && color === "rgb(38, 222, 96)" && simonSaid === true) {
        addPoint()
    } else if (keyState["Space"] && color === "rgb(38, 222, 96)" && simonSaid === false && errorTimer >= 1) {
        pointNum--
        pointsText.innerText = pointNum
        pointsText.style.color = "rgb(210, 51, 51)"
    } else if (keyState["Space"] && color === "rgb(38, 222, 96)" && simonSaid === false && errorTimer <= 0) {
        gameOver()
    } else if (keyState["Space"] && color === "rgb(210, 51, 51)" && simonSaid === false) {
        addPointRed()
    } else if (keyState["Space"] && color === "rgb(210, 51, 51)" && simonSaid === true && errorTimer >= 1) {
        pointNum--
        pointsText.innerText = pointNum
        pointsText.style.color = "rgb(210, 51, 51)"
    } else if (keyState["Space"] && color === "rgb(210, 51, 51)" && simonSaid === true && errorTimer <= 0) {
        gameOver()
    } else {pointsText.style.color = "rgb(0, 0, 0)"}
}

function gameOver() {
    gameStatus = false
    console.log("Game Over");
    gameOverState.style.visibility = "visible"
    restart.style.visibility = "visible"
    color = "rgb(158, 121, 121)"
    light.style.backgroundColor = color
    finalScore = pointNum
    newHighscore()
    console.log("finalscore is " + finalScore);
}

function gameLoop() {
    keyStateCheck()
    setTimeout(gameLoop, 10);
}

gameLoop();

function increaseSubtract() {
    subtraction += 0.2
}

function reduceError() {
    errorSubtract += 1
}

function errorIncrement() {
    console.log("errorIncrementRun");
    newErrorTimer--
    if (newErrorTimer <= 15){
        newErrorTimer = 15
    }
    setTimeout(errorIncrement, 1000)
}


function errorTime() {
    errorTimer += newErrorTimer
    errorInterval = setInterval(() => {
        if(errorTimer <= 0){
        clearInterval(errorInterval);
        }
        errorTimeTest.innerText = errorTimer;
        errorTimer -= 1;
    }, 15);
}

function timeRandomizerRed() {
    if (gameStatus === true) {
        simonDecider()
        pointNum += 1000
        errorTime()
        increaseSubtract()
        if (errorTimer <= 20){
            errorTimer = 20
        }
        redStart = Math.floor(Math.random() * (redMax - redMin + 1) + redMin)
        redStart -= subtraction
        if (redStart <= 1) {
            redStart = 1
            subtraction = 2
            console.log("Floor Reached");
        }
        console.log(redStart);
        console.log("Red Turn");
        color = "rgb(210, 51, 51)"
        light.style.backgroundColor = color
        lightAlert.style.color = "rgb(165, 13, 13)"
        lightAlert.innerText = simonSays + " Red Light!"
        setTimeout(timeRandomizerGreen, redStart * 1000)
        return redStart
    } else if (gameStatus === false){
        color = "rgb(158, 121, 121)"
        light.style.backgroundColor = color
    }
}

function timeRandomizerGreen() {
    if (gameStatus === true) {
        simonDecider()
        errorTime()
        pointNum += 1000
        increaseSubtract()
        greenStart = Math.floor(Math.random() * (greenMax - greenMin + 1) + greenMin)
        greenStart -= subtraction
        if (greenStart <= 1) {
            greenStart = 1
            subtraction = 2
            console.log("Floor Reached");
        }
        console.log(greenStart);
        console.log("Green Turn");
        color = "rgb(38, 222, 96)"
        light.style.backgroundColor = color
        lightAlert.style.color = "rgb(12, 85, 24)"
        lightAlert.innerText = simonSays + " Green Light!"
        setTimeout(timeRandomizerRed, greenStart * 1000)
        return greenStart
    } else if (gameStatus === false){
        color = "rgb(158, 121, 121)"
        light.style.backgroundColor = color
    }
}


// rgb(38, 222, 96) is green
// rgb(210, 51, 51) is red

function addPoint() {
    if (gameStatus === true) {
        pointNum += 8
        pointsText.innerText = pointNum
    }
}

function addPointRed() {
    if (gameStatus === true) {
        pointNum += 1
        pointsText.innerText = pointNum
    }
}

function startingTimer() {
    gameOverState.style.visibility = "hidden"
    testButton.style.visibility = "hidden"
    restart.style.visibility = "hidden"
    countdown.style.display = "block"
    overlay.style.display = "block"
    startInverval = setInterval(() => {
        startTime--
        countdown.innerText = startTime;
        if (startTime == 0) {
            countdown.style.display = "none"
            overlay.style.display = "none"
            gameStatus = true
            gameStart()
            clearInterval(startInverval)
        }
    }, 1000);
}

function gameStart() {
    if (gameStatus === true) {
        errorIncrement()
        timeRandomizerRed()
        console.log("Game Is Active");
    }
}

function restartGame() {
    color = "rgb(210, 51, 51)"
    pointNum = 0
    pointsText.innerText = pointNum
    gameStatus = false
    redStart = 7;
    redMin = 3;
    redMax = 7;
    greenStart = 6;
    greenMin = 2;
    greenMax = 6;
    subtraction = 0.2
    roomForError = 1.5
    errorTimer = 150
    errorSubtract = 10
    keyState = {};
    countdown.innerText = 3
    startTime = 3
    startingTimer()
}

function newHighscore() {
    if (finalScore >= highscore) {
        highscore = finalScore
        highScore.innerText = " " + highscore
        console.log(highscore);
        console.log("high score added");
    }
}


/*
    Step 2 done

    Step 3:

        Now make a function that will changed to a pass or fail if you meet the conditions of both the light and simon
 */


/* 
    Step 3 done

    Step 4: 

        Apply the add 1000 points to the didSimonSay function

        (RAN INTO A SNAG)
            I gotta create a seperate function that will add 1000 to every possible outcome if you listen to him. Right now I have it so it will add 1000 for each success + click, but now I need to make it so the points will add when you *don't* do anything.

            What might work best is just that when the game over state runs, the points stop adding. Otherwise the points will just normally add each turn.

            Also make sure the points add *specifically* on the light changing after a successful turn
*/

// Step 5: I think I can start to bring over the code from the normal mode now. Take it slow.



/*
    2-13-24

        So I seem to have all the basic stuff done and the game is about as functional as it needs to be. Today let's just add smaller elements like options and messages. EG, option to turn off the text that notifies of the light changing and a tutorial message before the game starts.

        CONT: legit all i can really think to do now is just to work on the hardmode. my mind is full of fuzz rn. I'd say we just make a new js file and work on the new fucntions of hardmode.

        What we will need:

        A 50/50 output decider that will randomly pick between Sim yes or Sim no.

        Win/loss variables changed to account for the status of Sim.

        Optional: Make points increase to a less degree if you do the opposite of what Sim requests. This just makes the game more active rather than just staying idle for most of it. Would get boring.

        In terms of what I will present by the end of the week: 

        They might be dissapointed. I'll have new stuff, but I kinda wanna have it be a suprise for the end. I'll add more option features probably. Maybe add options to change the light shape, that could be fun. Might be a good practice on how to use a dropdown menu.

        I finished the tutorial message today, but it might be all I can really muster as of now. I'm eepy.
*/

/*
    Sources:

        50/50 decider based off of https://stackoverflow.com/questions/32302066/coin-toss-with-javascript-and-html by Amit
*/