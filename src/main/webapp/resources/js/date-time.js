Number.prototype.twoDigits = function() {
    const string = this.toString();
    return string.length === 1 ? `0${string}` : string;
};

export class DateTime {
    #months = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ];

    #days = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
    ];

    #dayName;
    #month;
    #dayNumber;
    #year;
    #hour;
    #minutes;
    #seconds;
    #period;

    constructor({ dayName, month, dayNumber, year, hour, minutes, seconds, period }) {
        this.#dayName = dayName;
        this.#month = month;
        this.#dayNumber = dayNumber;
        this.#year = year;
        this.#hour = hour;
        this.#minutes = minutes;
        this.#seconds = seconds;
        this.#period = period;
    }

    show = () => {
        const date = new Date();
        const hours = date.getHours();

        this.#dayName.textContent = this.#days[date.getDay()];
        this.#month.textContent = this.#months[date.getMonth()];
        this.#dayNumber.textContent = date.getDate().twoDigits();
        this.#year.textContent = date.getFullYear();
        this.#hour.textContent = hours.twoDigits();
        this.#minutes.textContent = date.getMinutes().twoDigits();
        this.#seconds.textContent = date.getSeconds().twoDigits();
    };
}
