const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const bestBoard = document.querySelector('.best');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;
let best = 0;
let level=2000;
var modal = document.getElementById("myModal");


function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

var hole;
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
    const time = randomTime(200, level);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

let xx=0;

function startGame(num) {
    xx +=num;
    if (xx>1) {
        level -= 200;
    }
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 15000)

}


function bonk(e) {
    const holess= hole.getAttribute('data-key');
    console.log(holess);
    console.log(e.key);
    if(e.key==holess) {
        score++;
        scoreBoard.textContent = score;
        hole.classList.remove('up');
    }
    if (best < score){
        best= score;
        bestBoard.textContent = best;
    }
}







