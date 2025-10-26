import { Clock } from './clock.js';

const clock = new Clock({
    hour: document.querySelector('.hour'),
    minute: document.querySelector('.minute'),
    second: document.querySelector('.second')
});

function syncClockWithBackend() {
    const timeText = document.getElementById("clockForm:timeText").innerText;
    if (!timeText) return;

    clock.animate(timeText);
}

setInterval(syncClockWithBackend, 1000);
