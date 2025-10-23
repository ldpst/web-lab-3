import { Decimal } from "decimal.js";

let xSelected = null;
let xValue;

document.addEventListener("DOMContentLoaded", () => {
    const savedInput = localStorage.getItem("xInputValue");

    const xInput = document.getElementById("input-form:x-input");

    if (savedInput !== null) {
        xValue = savedInput;
        xInput.value = xValue;

        document.querySelectorAll('.x-btn').forEach(btn => {
            if (btn.value === xValue) {
                btn.classList.add('selected');
            }
        });
    }
});


function switchX(button) {
    xSelected = button;

    const xInput = document.getElementById("input-form:x-input");
    xInput.value = button.value;
    localStorage.setItem("xInputValue", button.value);
    document.querySelectorAll('.x-btn').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}

function checkX() {
    const xInput = document.getElementById("input-form:x-input");
    const str = xInput.value;
    if (typeof str !== "string" || str.trim() === "" || isNaN(str) || isNaN(Number(str))) {
        makeNotification("Выберите X");
        return false;
    }
    return true;
}

function checkY() {
    const str = document.getElementById("input-form:y-input").value;
    return checkYValue(str);
}

function checkYValue(str) {
    if (typeof str !== "string" || str.trim() === "") {
        makeNotification("Введите значение Y");
        return false;
    }

    let y;
    try {
        y = new Decimal(str);
    } catch (e) {
        makeNotification("Введите Y в формате числа (от -3 до 5)");
        return false;
    }

    const min = new Decimal(-3);
    const max = new Decimal(5);

    if (y.greaterThanOrEqualTo(min) && y.lessThanOrEqualTo(max)) {
        return true;
    } else {
        makeNotification("Введите Y в формате числа (от -3 до 5)");
        return false;
    }
}

function showYError() {
    var msgEl = document.getElementById("input-form:y-error");
    if (msgEl && msgEl.textContent.trim() !== "") {
        makeNotification(msgEl.textContent.trim());
    }
}