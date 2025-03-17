const body = document.querySelector('body');
const container = document.querySelector('.container');
const pomodoroTag = document.querySelector('#pomodoro');
const shortTag = document.querySelector('#shortbreak');
const longTag = document.querySelector('#longbreak');
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');
const clock = document.querySelector('#clock');
const options = document.querySelectorAll(".option");

let timeLeft = 25 * 60;
let timeInterval;
let isRunning = false;

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    clock.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startPauseTimer() {
    if (!isRunning) {
        isRunning = true;
        startButton.textContent = 'PAUSE';
        resetButton.style.display = 'block';

        timeInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimer();
            } else {
                clearInterval(timeInterval);
                isRunning = false;
                startButton.textContent = 'START';
            }
        }, 1000);
    } else {
        isRunning = false;
        clearInterval(timeInterval);
        startButton.textContent = 'START';
    }
}

// Resets the timer and stops it
function resetTimer() {
    clearInterval(timeInterval);
    isRunning = false;
    startButton.textContent = 'START';
    resetButton.style.display = 'none';

    // Set correct time based on selected mode
    if (pomodoroTag.classList.contains('selected')) {
        timeLeft = 25 * 60;
    } else if (shortTag.classList.contains('selected')) {
        timeLeft = 5 * 60;
    } else if (longTag.classList.contains('selected')) {
        timeLeft = 15 * 60;
    }

    updateTimer();
}

// Handles mode switching and resets timer
function changeMode() {
    pomodoroTag.addEventListener('click', () => {
        setMode('#8FBFE0', '#6FA7CC', '#6FA7CC', 25 * 60, pomodoroTag);
    });

    shortTag.addEventListener('click', () => {
        setMode('#7C77B9', '#A098D1', '#A098D1', 5 * 60, shortTag);
    });

    longTag.addEventListener('click', () => {
        setMode('#1D8A99', '#44A3B2', '#44A3B2', 15 * 60, longTag);
    });
}

// Updates the UI and resets timer when switching modes
function setMode(bgColor, containerColor, textColor, newTime, selectedTag) {
    body.style.backgroundColor = bgColor;
    container.style.backgroundColor = containerColor;
    startButton.style.color = textColor;
    resetButton.style.color = textColor;

    clearInterval(timeInterval);
    isRunning = false;
    startButton.textContent = 'START';

    timeLeft = newTime;
    updateTimer();

    // Remove previous selections and apply new one
    options.forEach(opt => opt.classList.remove('selected'));
    selectedTag.classList.add('selected');

    resetButton.style.display = 'none'; // Hide reset button when switching modes
}

// Set event listeners for mode options
options.forEach(option => {
    option.addEventListener('click', () => {
        options.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
    });
});

// Initialize the timer and event listeners
updateTimer();
changeMode();
startButton.addEventListener('click', startPauseTimer);
resetButton.addEventListener('click', resetTimer);