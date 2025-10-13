export class Clock {
    #hour;
    #minute;
    #second;

    constructor({ hour, minute, second }) {
        this.#hour = hour;
        this.#minute = minute;
        this.#second = second;
    }

    show = () => {
        const date = new Date();

        const hour = ((date.getHours() + 11) % 12 + 1) * 30;
        const minute = date.getMinutes() * 6;
        const second = date.getSeconds() * 6;

        this.#hour.style.transform = `rotate(${hour}deg)`;
        this.#minute.style.transform = `rotate(${minute}deg)`;
        this.#second.style.transform = `rotate(${second}deg)`;
    };
}