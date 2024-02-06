/*  
    Functions we will need:

        - Something to check and see if the space bar is being held

        - A random timer for the light to change

        - Something that will display or hide elements depending on certain veriables

        - Set a small 3 second timer as soon as you click start so you don't immediatly lose the game if you accidently hold space slightly too long when starting.

*/

/*
    A good first step would be to just have the color of the light change to green on a button press
*/

// "#d23333", "#26de60" rgb(38, 222, 96)

const light = document.getElementById("light")
const testButton = document.getElementById("testButton")

// testButton.addEventListener('click', () => {
//     if (light.style.backgroundColor == "rgb(210, 51, 51)") {
//         light.style.backgroundColor = "rgb(38, 222, 96)";
//     } else {
//         light.style.backgroundColor = "rgb(210, 51, 51)";
//     }
// });

// !!!!STEP 1 FINISHED!!!!

// Step 2: Now make the light switch back and forth on a timer. Don't worry about making it random yet.

// const timeRandomizer = Math.floor(Math.random() * 5 + 1) * 1000;

// testButton.addEventListener('click', () => {
//     light.style.backgroundColor = "rgb(210, 51, 51)"
//     setInterval(changeLight, 1000);
// })

// function changeLight() {
//     if (light.style.backgroundColor == "rgb(210, 51, 51)") {
//         light.style.backgroundColor = "rgb(38, 222, 96)";
//     } else {
//         light.style.backgroundColor = "rgb(210, 51, 51)";
//     }
// }

// !!!!STEP 2 FINISHED!!!! (We also made it so the timer starts on a button click!)

// Step 3: Now let's figure out how to make the light change at different times "randomly". Even easier start, let's just figure out the equation and log it.



// 3.5: let's see how we can change the min max values depending on the color of the light


let redMin = 3,
redMax = 8; // the game will always start out with red light, so the innital values can be adjusted for it first.


function timeRandomizer() {
    let min = 1,
    max = 5;
    let randomNumber = Math.floor(Math.random() * (max - min + 1) + min)
    console.log(randomNumber);
    setTimeout(timeRandomizer, randomNumber * 1000)
}

// function intervalFloor() {
//     if (redMin <= 1 && redMax <= 3)
//     // cancel function that lowers the red min/max
//     if (greenMin <= 1 && greenMax <= 2)
//     // cancel function that lowers the green min/max
// } // this will be used to stop the min/max numbers from going any lower.

const redLight = "rgb(210, 51, 51)";
const greenLight = "rgb(38, 222, 96)";

function changeLight() {
    if (light.style.backgroundColor == redLight) {
        light.style.backgroundColor = greenLight;
        console.log("light has turned green");
    } else {
        light.style.backgroundColor = redLight;
        console.log("light has turned red");
    }
}

testButton.addEventListener('click', () => {
    light.style.backgroundColor == redLight;
    
})

