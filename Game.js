const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const bestBoard = document.querySelector('.best');
const bestBoard2 = document.querySelector('.best2');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;
let best = 0;
let level = 2000;
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
    const time = randomTime(200, level);
    const hole = randomHole(holes);
    hole.classList.add('up');
    holeBonked = false; // איפוס הדגל holeBonked כאשר חור חדש מוצג

    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

let xx = 0;

// התחלת המשחק
function startGame(num) {
    xx += num;
    if (xx > 1) {
        level -= 200;
    }
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => {
        timeUp = true;
        bestscore(input); // קריאה לפונקציה bestscore עם הקלט של השחקן
    }, 5000);
}

let holeBonked = false;

// טיפול במקשים שנלחצים
function bonk(e) {
    if (hole && hole.classList.contains('up') && !holeBonked) {
        const holess = hole.getAttribute('data-key');
        console.log(holess);
        console.log(e.key);
        if (e.key == holess) {
            score++;
            scoreBoard.textContent = score;
            holeBonked = true; // עדכון הדגל holeBonked לtrue לסימון שהחור נמכה
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
window.onload = function () {

    best = localStorage.getItem('best');
    bestBoard.textContent = localStorage.getItem('bestInput');
    bestBoard2.textContent = localStorage.getItem('best');
    input = prompt("Please enter your name:");
    while (input === "") {
        input = prompt("Please enter your name:");
    }

    setTimeout(() => {
        startGame();
    }, 2000);
};
