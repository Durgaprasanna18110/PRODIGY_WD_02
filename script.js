let timerInterval;
let elapsedTime = 0;
let isRunning = false;

const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const milliseconds = String(ms % 1000).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function startTimer() {
    if (!isRunning) {
        const startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
        }, 10); // Use a 10ms interval for better precision
        isRunning = true;
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.textContent = '00:00:00.000';
    lapsContainer.innerHTML = '';
    isRunning = false;
}

function recordLap() {
    if (isRunning) {
        const lapTime = document.createElement('div');
        lapTime.textContent = formatTime(elapsedTime);
        lapsContainer.appendChild(lapTime);
    }
}

// Attach event listeners to buttons
document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
document.getElementById('lapBtn').addEventListener('click', recordLap);
