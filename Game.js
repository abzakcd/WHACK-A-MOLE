const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const bestBoard = document.querySelector('.best');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let timeUp2 = false;
let score = 0;
let best = 0;
let levelMax=1000;
let levelMin = 300;
var modal = document.getElementById("myModal");
var hole;
let audio =new Audio("HIT2.wav");
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


function randomHole(holes){
    const idx = Math.floor(Math.random() * holes.length);
    hole =  holes[idx];
    if(hole== lastHole){
        return  randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(levelMin, levelMax);
    const hole = randomHole(holes);
    hole.classList.add('up');
    holeBonked = false; // Reset the holeBonked flag when a new hole is displayed

    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

//let xx = 0;

function startGame() {
    /*xx = e;
    if (xx===1) {
        timeUp = true;
        score = 0;
        scoreBoard.textContent = score;
        setTimeout(xx = 0, 2000);
    }*/
    document.getElementById('button').style.display = "none";
   // if (xx===0) {
        // levelMax -= 200;
        scoreBoard.textContent = 0;
        timeUp = false;
        //timeUp2 = false;
        score = 0;
        levelMax = 1200;
        levelMin = 500;
        setTimeout(() => {
            peep()
        }, 2000);
        //peep();
        setTimeout(() => {
            timeUp = true; /*timeUp2 = true;*/
            xx = 0;
            bestScore();
            document.getElementById('button').style.display = "inline-block";

        }, 30000);
        //}
  //  }
}

let holeBonked = false;

function bonk(e) {
    if(timeUp === false) {
        const holess = hole.getAttribute('data-key');
        if (/*hole.classList.contains('up') &&*/  e.key !== holess && (e.key === 'q' || e.key === 'w' || e.key === 'e' || e.key === 'r')) {
            score -= 10;
            scoreBoard.textContent = score;
            playMiss();
        }
        if (/*hole &&*/ hole.classList.contains('up') && !holeBonked && e.key === holess) {

            /*console.log(holess);
            console.log(e.key);*/
            //if (e.key == holess) {

            score += 10;
            playSound();
            //audio.play();
            hole.classList.remove('up');
            //Play_Music();
            scoreBoard.textContent = score;
            holeBonked = true; // Set the flag to true to indicate the hole has been bonked
            /*if(score >= 10 && score % 10 === 0){
                levelMax-=100;
                levelMin -= 50;
                timeUp = true;
                if(timeUp2 !== true){
                    setTimeout(() => {timeUp = false ; peep()} , 3000);
                }*/

        }
    }
}
function playSound(){
    const audio = new Audio("HIT2.wav");
    audio.currentTime = 0;
    audio.play();
}
function playMiss(){
    const audio2 = new Audio("Miss.wav");
    audio2.currentTime = 0;
    audio2.play();
}
function bestScore(){
    if (best < score) {
        best = score;
        bestBoard.textContent = best;
    }
}
