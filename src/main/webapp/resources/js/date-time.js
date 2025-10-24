export class DateTime {
    #dateText;
    #timeText;

    constructor({ dateText, timeText }) {
        this.#dateText = dateText;
        this.#timeText = timeText;
    }

    syncFromDOM() {
        // JSF уже обновил текст
        const date = this.#dateText.textContent;
        const time = this.#timeText.textContent;
        return { date, time };
    }
}
