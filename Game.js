// Function that returns a random time between min and max
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Function that returns a random hole from the list of holes
function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    // If the selected hole is the same as the last hole chosen (according to the lastHole variable),
    // choose a new random hole
    if (hole == lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

// Function that displays a mole randomly for a random time between 200 and level (depending on the game's difficulty)
function peep() {
    const time = randomTime(200, level);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        // If the game time is not up yet (timeUp is currently false), continue displaying moles
        if (!timeUp) peep();
    }, time);
}

// Function that starts a new game
function startGame(num) {
    xx += num;
    // Increase the difficulty level every time the startGame function is called more than once
    if (xx > 1) {
        level -= 200;
    }
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    // Set a time limit of 15 seconds for the game
    setTimeout(() => timeUp = true, 15000);
}

// Function that checks if the mole hits the correct hole, updates the player's score, and the highest score achieved
function bonk(e) {
    // Get the data-key attribute of the hole where the mole is currently up
    const holess = hole.getAttribute('data-key');
    console.log(holess);
    console.log(e.key);
    // Check if the key pressed matches the data-key attribute of the hole where the mole is up, and then update the score
    if (e.key == holess) {
        score++;
        scoreBoard.textContent = score;
        hole.classList.remove('up');
    }
    // Check if the new score is higher than the player's highest score, and then update the highest score
    if (best < score) {
        best = score;
        bestBoard.textContent = best;
    }
}
