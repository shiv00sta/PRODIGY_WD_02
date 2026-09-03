let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapCounter = 1;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);

  const pad = (num) => String(num).padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.<span class="millis">${pad(milliseconds)}</span>`;
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    display.innerHTML = formatTime(elapsedTime);
  }, 10);

  startBtn.disabled = true;
  pauseBtn.disabled = false;
  lapBtn.disabled = false;
  resetBtn.disabled = false;
}

function pauseTimer() {
  clearInterval(timerInterval);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  lapCounter = 1;
  display.innerHTML = `00:00:00.<span class="millis">00</span>`;
  lapsList.innerHTML = '';

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
  resetBtn.disabled = true;
}

function recordLap() {
  if (elapsedTime === 0) return;
  
  const lapItem = document.createElement('li');
  lapItem.innerHTML = `<span>Lap ${lapCounter++}</span><span>${display.innerText}</span>`;
  lapsList.prepend(lapItem);
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);