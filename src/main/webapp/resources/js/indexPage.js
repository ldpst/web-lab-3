import {DateTime} from './date-time.js';
import {Clock} from "./clock.js";

document.addEventListener('DOMContentLoaded', () => {
    const interval = 6000;

    const clock = new Clock({
        hour: document.querySelector('.hour'),
        minute: document.querySelector('.minute'),
        second: document.querySelector('.second'),
    });

    clock.show();
    setInterval(() => clock.show(), interval);

    const dateTime = new DateTime({
        dayName: document.getElementById('day-name'),
        month: document.getElementById('month'),
        dayNumber: document.getElementById('day-number'),
        year: document.getElementById('year'),
        hour: document.getElementById('hour'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds'),
        period: document.getElementById('period'),
    });

    dateTime.show();
    setInterval(() => dateTime.show(), interval);
});
