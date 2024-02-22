
const light = document.getElementById("light")
const pointsText = document.getElementById('points')
const countdown = document.getElementById('countdown')
const overlay = document.getElementById('overlay')
const testButton = document.getElementById('testButton')
const lightAlert = document.getElementById('lightAlert')
const errorTimeTest = document.getElementById('errorTimeTest')
const gameOverState = document.getElementById('gameOver')
const restart = document.getElementById('restartButton')
const highScore = document.getElementById('highScore')
const hideRules = document.getElementById('hideRules')
const tutorial = document.getElementById('tutorial')
const changeShape = document.getElementById('shapeSelect')

let color = "rgb(210, 51, 51)"
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

changeShape.value = "x"

changeShape.addEventListener('change', ()=> {
    shapeChange()
    console.log(changeShape.value);
})

function shapeChange() {
    if (changeShape.value === "diamond") {
        light.style.maskImage = "url(/media/diamond_no_t.png)"
    } else if (changeShape.value === "octagon") {
        light.style.maskImage = "url(/media/octagon_no_t.png)"
    } else if (changeShape.value === "circle") {
        light.style.maskImage = "url(/media/circle.png)"
    } else if (changeShape.value === "heart") {
        light.style.maskImage = "url(/media/heart_no_t.png)"
    } else if (changeShape.value === "star") {
        light.style.maskImage = "url(/media/star.png)"
    } else if (changeShape.value === "oval") {
        light.style.maskImage = "url(/media/oval.png)"
    } else if (changeShape.value === "triangle") {
        light.style.maskImage = "url(/media/triangle.png)"
    } else if (changeShape.value === "pfffghgahfpf") {
        light.style.maskImage = "url(/media/pfffghgahfpf.png)"
    } else if (changeShape.value === "square") {
        light.style.maskImage = ""
}}

testButton.addEventListener('click', ()=> {
    startingTimer()
})

restart.addEventListener('click', ()=> {
    restartGame()
})

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

function keyStateCheck() {
    if (keyState["Space"] && color == "rgb(38, 222, 96)"){
        addPoint()
    } else if (keyState["Space"] && color == "rgb(210, 51, 51)" && errorTimer >= 1) {
        pointNum--
        pointsText.innerText = pointNum
        pointsText.style.color = "rgb(210, 51, 51)"
    } else if (keyState["Space"] && color == "rgb(210, 51, 51)" && errorTimer <= 0) {
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
        errorTime()
        increaseSubtract()
        if (errorTimer <= 20){
            errorTimer = 20
        }
        redStart = Math.floor(Math.random() * (redMax - redMin + 1) + redMin)
        redStart -= subtraction
        if (redStart <= 2) {
            redStart = 2
            subtraction = 3
            console.log("Floor Reached");
        }
        console.log(redStart);
        console.log("Red Turn");
        color = "rgb(210, 51, 51)"
        light.style.backgroundColor = color
        lightAlert.style.color = "rgb(210, 51, 51)"
        lightAlert.innerText = "Red Light!"
        setTimeout(timeRandomizerGreen, redStart * 1000)
        return redStart
    } else if (gameStatus === false){
        color = "rgb(158, 121, 121)"
        light.style.backgroundColor = color
    }
}

function timeRandomizerGreen() {
    if (gameStatus === true) {
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
        lightAlert.innerText = "Green Light!"
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
    2-14-24

        Uhhhh hard mode was a lot easier to make than I thought it would be. I already have it done.

        Not sure what to do now.

        I suppose now I'll just make an option to change the shape of the light (by herb's request)
*/



/*

    Sources:

    "Game Loop" function was taken from "nnnnn" 
    link: https://jsfiddle.net/nnnnnn/gedk6/

    "Random Number Generator" function was based on code from "danday74" and "Francisc"
    https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
*/ 