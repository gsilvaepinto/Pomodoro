const body = document.querySelector('body');
const container = document.querySelector('.container');
const pomodoroTag = document.querySelector('#pomodoro');
const shortBreakTag = document.querySelector('#shortbreak');
const longBreakTag = document.querySelector('#longbreak');
const options = document.querySelectorAll('.option');
const clock = document.querySelector('#clock');
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');

let timeLeft = 0.1 * 60;
let timeInterval;
let isRunning = false;

function updateTimer(){
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    clock.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startPauseTimer(){
    if (!isRunning){
        isRunning = true;
        resetButton.style.display = 'block';
        startButton.textContent = 'PAUSE';

        timeInterval = setInterval(() => {
            if (timeLeft > 0){
                timeLeft--;
                updateTimer();
            } else {
                startButton.textContent = 'START';
                startButton.disabled = true;
                startButton.style.opacity = 0.7;
                clearInterval(timeInterval);
            }
        }, 1000)
    } else {
        isRunning = false;
        startButton.textContent = 'START';
        resetButton.style.display = 'none';
        clearInterval(timeInterval);
    }
}

function resetTimer(){

    isRunning = false;
    clearInterval(timeInterval);
    startButton.disabled = false;
    startButton.textContent = 'START';
    startButton.style.opacity = 1;
    resetButton.style.display = 'none';

    if (pomodoroTag.classList.contains('selected')){
        timeLeft = 25 * 60;
    }
    else if (shortBreakTag.classList.contains('selected')){
        timeLeft = 5 * 60;
    }
    else if (longBreakTag.classList.contains('selected')){
        timeLeft = 15 * 60;
    }

    updateTimer();
}

function changeMode(){
    options.forEach(option => {
        option.onclick = () => {
            if (option.id === 'pomodoro') setMode('#8FBFE0', '#6FA7CC', '#6FA7CC', 25 * 60, option);
            if (option.id === 'shortbreak') setMode('#7C77B9', '#A098D1', '#A098D1', 5 * 60, option);
            if (option.id === 'longbreak') setMode('#1D8A99', '#44A3B2', '#44A3B2', 15 * 60, option);
        }
    })
}

function setMode(bgColor, containerColor, textColor, newTime, selectedTag){
    body.style.backgroundColor = bgColor;
    container.style.backgroundColor = containerColor;
    startButton.style.color = textColor;
    resetButton.style.color = textColor;

    isRunning = false;
    resetButton.style.display = 'none';
    startButton.style.opacity = 1;
    startButton.disabled = false;
    startButton.textContent = 'START';

    timeLeft = newTime;
    clearInterval(timeInterval);

    options.forEach(option => option.classList.remove('selected'));
    selectedTag.classList.add('selected');

    updateTimer();
}

updateTimer();
changeMode();

startButton.addEventListener('click', startPauseTimer);
resetButton.addEventListener('click', resetTimer);
