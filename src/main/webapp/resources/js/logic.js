import {drawGraph} from "./graph.js"
import {clearAllPoints, renderAllPoints} from "./graphOverlay.js";

let selected = null;
const home = "http://localhost:8080";


// window.addEventListener("pageshow", function (event) {
//     if (event.persisted) {
//         window.location.reload();
//     }
// });

document.addEventListener("DOMContentLoaded", () => {
    const xSelect = document.getElementById("x-select");
    const yInput = document.getElementById("y-input");
    const rSelect = document.getElementById("r-select");

    const x = localStorage.getItem("xSelect");
    if (x != null) {
        xSelect.value = x;
    }
    const y = localStorage.getItem("yInput");
    if (y != null) {
        yInput.value = y;
    }
    const r = localStorage.getItem("rSelect");
    if (r != null) {
        rSelect.value = r;
        drawGraph(r);
        renderAllPoints(r);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // const getUrl = home + "/api"
    // fetch(getUrl, {
    //     method: "GET"
    // }).then(request => {
    //     return request.json()
    // }).then(data => {
    //     data.forEach(shoot => {
    //         addToTable(shoot);
    //     })
    // }).catch(error => {
    //     console.log(error)
    // });

    const rSelect = document.getElementById("r-select");

    drawGraph(rSelect.value);
    renderAllPoints(rSelect.value);

    const xSelect = document.getElementById("x-select");
    xSelect.addEventListener("change", () => {
        localStorage.setItem("xSelect", xSelect.value);
    });


    const yInput = document.getElementById("y-input");
    yInput.addEventListener("input", () => {
        localStorage.setItem("yInput", yInput.value);
    });


    rSelect.addEventListener("change", (event) => {
        localStorage.setItem("rSelect", event.target.value);
        drawGraph(event.target.value);
    });

    // const sendBtn = document.getElementById("send-btn");
    // const sendError = document.getElementById("send-error");
    // const yError = document.getElementById("y-error");
    //
    // const shootForm = document.getElementById("shoot-form");
    // shootForm.addEventListener('submit', event => {
    //     event.preventDefault();
    //
    //     const yVal = yInput.value;
    //
    //     const y = checkY(yVal, yError);
    //
    //     if (y) {
    //         shootForm.submit();
    //     }
    // });
    //
    // const clearBtn = document.getElementById("clear-btn");
    // clearBtn.addEventListener("click", () => {
    //     const url = home + "/api/clear";
    //     fetch(url, {
    //         method: "POST"
    //     })
    //         .then(clearTable)
    //         .catch(err => console.log(err));
    // });
})
;

// function clearTable() {
//     clearAllPoints();
//     const table = document.getElementById("res-table");
//     const rows = table.rows;
//
//     for (let i = rows.length - 1; i >= 2; i--) {
//         if (i >= 2) {
//             table.deleteRow(i);
//         }
//     }
// }
//
// function addToTable(data) {
//     const resTable = document.getElementById("res-table");
//     const row = resTable.insertRow(2);
//     row.insertCell(0).textContent = data.x;
//     row.insertCell(1).textContent = data.y;
//     row.insertCell(2).textContent = data.r;
//     row.insertCell(3).textContent = data.duration;
//     row.insertCell(4).textContent = data.date;
//     row.insertCell(5).textContent = data.check ? "Y" : "N";
// }
//
// function checkY(str, error) {
//     if (typeof str !== "string" || str.trim() === "" || isNaN(str) || isNaN(Number(str))) {
//         error.style.display = "block";
//         error.textContent = "❌ Введите в формате числа (от -5 до 3)";
//         return false;
//     } else {
//         if (-5 <= Number(str) && Number(str) <= 3) {
//             const decimalPart = str.split('.')[1];
//             if (decimalPart && decimalPart.length > 10) {
//                 error.style.display = "block";
//                 error.textContent = "❌ Слишком много цифр после точки (макс. 10)";
//                 return false;
//             } else {
//                 error.style.display = "none";
//                 return true;
//             }
//         } else {
//             error.style.display = "block";
//             error.textContent = "❌ Введите в формате числа (от -5 до 3)";
//             return false;
//         }
//     }
// }

// function checkX(error) {
//     if (selected === null) {
//         error.style.display = "block";
//         return false;
//     } else {
//         error.style.display = "none";
//         return true;
//     }
// }
