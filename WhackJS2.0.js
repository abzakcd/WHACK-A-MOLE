const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const bestBoard = document.querySelector('.best');
const bestBoard2 = document.querySelector('.best2');
const moles = document.querySelectorAll('.mole');
let safetyPoint = 0;
let lastHole;
let timeUp = false;
let score = 0;
let best = 0;
let levelMin = 800;
let levelMax = 1500;
var modal = document.getElementById("myModal");
var hole; // משתנה שיכול להשתנות על ידי הפונקציה randomHole
let input; // משתנה שמחזיק את הקלט של השחקן

// פונקציה המחזירה זמן רנדומלי בין min ל-max
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// פונקציה המחזירה חור רנדומלי מתוך מערך החורים
function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    hole = holes[idx];
    if (hole == lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

// הצגת הקרפופר לזמן רנדומלי בחור רנדומלי
function peep() {
    const time = randomTime(levelMin, levelMax);
    const hole = randomHole(holes);
    hole.classList.add('up');
    holeBonked = false; // איפוס הדגל holeBonked כאשר חור חדש מוצג

    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp && !timeUpLevelUp) peep();
    }, time);
}

//let xx = 0;
let timeUpLevelUp = false;
// התחלת המשחק
function startGame() {
    document.getElementById("gameStart").style.display = "none";
    setTimeout(() =>{
    scoreBoard.textContent = 0;
    timeUp = false;
    timeUpLevelUp = false;
    score = 0;
    peep();
    setTimeout(() => {
        timeUp = true;
        bestscore(input); // קריאה לפונקציה bestscore עם הקלט של השחק
        document.getElementById("gameStart").style.display = "flex";
    },60000 );
},3000);
}

let holeBonked = false;

// טיפול במקשים שנלחצים
/*function bonk(e) {
    if (hole && hole.classList.contains('up') && !holeBonked) {
        const holess = hole.getAttribute('data-key');
        console.log(holess);
        console.log(e.key);
        if (e.key == holess) {
            score++;
            playSound();
            scoreBoard.textContent = score;
            holeBonked = true; // עדכון הדגל holeBonked לtrue לסימון שהחור נמכה
        }
    }
}*/
function bonk(e) {
    if(timeUp === false) {
        const holess = hole.getAttribute('data-key');
        if (  e.key !== holess && (e.key === 'q' || e.key === 'w' || e.key === 'e' || e.key === 'r')) {
            score -= 10;
            playMiss();
            scoreBoard.textContent = score;
        }
        if ( hole.classList.contains('up') && !holeBonked && e.key === holess) {
            score += 10;
            playSound();
            hole.classList.remove('up');
            scoreBoard.textContent = score;
            holeBonked = true; // Set the flag to true to indicate the hole has been bonked
            if(score % 100 === 0 && score > 0 && score % 1000 > safetyPoint){
                safetyPoint = score % 1000
                timeUpLevelUp = true;
                levelMin -=50;
                levelMax -=150;
                setTimeout(() =>{
                    timeUpLevelUp = false;
                    peep();
                } , 3000);
            }
        }
    }
}


// טיפול בניקוד הכי גבוה
function bestscore() {
    if (best < score ) {
        best = score;
        bestBoard.textContent = input; // עדכון השם הכי גבוה ב-HTML
        bestBoard2.textContent = best; // עדכון הניקוד הכי גבוה ב-HTML

        localStorage.setItem('best', best);
        localStorage.setItem('bestInput', input);
    }
}

// טעינת הדף - אחזור ניקוד הכי גבוה מה-LocalStorage
window.onload = function() {

    best = localStorage.getItem('best');
    bestBoard.textContent = localStorage.getItem('bestInput');
    bestBoard2.textContent = localStorage.getItem('best');
    input = prompt("Please enter your name:");

    while (input === "") {
        input = prompt("Please enter your name:");
    }
    startGame();

   /* setTimeout(() => {

    }, 2000);*/
}

function resetGame(){
location.reload();
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