// פונקציה שמחזירה זמן רנדומלי בין min ל-max
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// פונקציה שמחזירה חור רנדומלי מתוך רשימת החורים
function randomHole(holes){
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    // אם החור שנבחר הוא זהה לחור שכבר נבחר בפעם הקודמת (לפי המשתנה lastHole), נבחר חור חדש רנדומלי
    if (hole == lastHole){
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

// פונקציה שמציגה יונק בחור רנדומלי במשך זמן רנדומלי בטווח שנמצא בין 200 ל-level (בהתאם לתחושת המשחק)
function peep() {
    const time = randomTime(200, level);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        // אם זמן המשחק עוד לא נגמר (timeUp כרגע שווה לfalse), נמשיך להציג יונקים
        if (!timeUp) peep();
    }, time);
}

// פונקציה שמתחילה משחק חדש
function startGame(num) {
    xx += num;
    if (xx > 1) {
        level -= 200;
    }
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    // קביעת הפרק זמן של 15 שניות למשחק
    setTimeout(() => timeUp = true, 15000);
}

// פונקציה שבודקת האם היונק נכנס בחור הנכון ומעדכנת את ציון השחקן והציון הכי גבוה שלו
function bonk(e) {
    // משיכת המספר של החור בו היונק נוצץ
    const holess = hole.getAttribute('data-key');
    console.log(holess);
    console.log(e.key);
    // בדיקה האם המקש שהוקש תואם את המספר של החור בו היונק נוצץ, ואז מעדכנים את הניקוד
    if (e.key == holess) {
        score++;
        scoreBoard.textContent = score;
        hole.classList.remove('up');
    }
    // בדיקה האם הניקוד החדש של השחקן עבר את הניקוד הכי גבוה שלו ואז מעדכנים את הניקוד הכי גבוה
    if (best < score){
        best= score;
        bestBoard.textContent = best;
    }
}
