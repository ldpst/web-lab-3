export class DateTime {
    #dateText;
    #timeText;

    constructor({ dateText, timeText }) {
        this.#dateText = dateText;
        this.#timeText = timeText;
    }

    syncFromDOM() {
        const date = this.#dateText.textContent;
        const time = this.#timeText.textContent;
        return { date, time };
    }
}
