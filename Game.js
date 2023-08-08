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


function randomHole(holes){
    const idx = Math.floor(Math.random() * holes.length);
    const hole =  holes[idx];
    if(hole== lastHole){
       return  randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(300, level);
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
    console.log(e.keyCode);
    if(!e.isTrusted) return; // cheater!
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;

    if (best < score){
        best= score;
        bestBoard.textContent = best;
    }
}




moles.forEach(mole => mole.addEventListener('click', bonk));




