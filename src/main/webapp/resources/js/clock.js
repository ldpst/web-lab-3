export class Clock {
    #hour;
    #minute;
    #second;

    constructor({ hour, minute, second }) {
        this.#hour = hour;
        this.#minute = minute;
        this.#second = second;
    }

    animate(timeString) {
        const [h, m, s] = timeString.split(" : ").map(Number);

        const hourDeg = ((h % 12) + m / 60) * 30;
        const minuteDeg = m * 6;
        const secondDeg = s * 6;

        this.#hour.style.transform = `rotate(${hourDeg}deg)`;
        this.#minute.style.transform = `rotate(${minuteDeg}deg)`;
        this.#second.style.transform = `rotate(${secondDeg}deg)`;
    }
}
