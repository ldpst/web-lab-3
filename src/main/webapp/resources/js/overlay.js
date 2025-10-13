const svgNS = "http://www.w3.org/2000/svg";
const overlayContainer = document.getElementById("overlaySvgContainer");

const overlaySvg = document.createElementNS(svgNS, "svg");
overlaySvg.setAttribute("id", "overlay-svg");
overlaySvg.setAttribute("width", "100%");
overlaySvg.setAttribute("height", "100%");
overlayContainer.appendChild(overlaySvg);

const rSelect = document.getElementById("r-select");
const overlayError = document.getElementById("overlay-error");

let R = parseFloat(rSelect.value);

function savePoints(points) {
    localStorage.setItem('savedPoints', JSON.stringify(points));
}

function loadPoints() {
    const saved = localStorage.getItem('savedPoints');
    return saved ? JSON.parse(saved) : [];
}

let points = loadPoints();

function getSvgSize() {
    const rect = overlaySvg.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
}

let vLine = document.createElementNS(svgNS, "line");
vLine.setAttribute("stroke", "gray");
vLine.setAttribute("stroke-width", "1");
vLine.setAttribute("stroke-dasharray", "4,2");

let hLine = document.createElementNS(svgNS, "line");
hLine.setAttribute("stroke", "gray");
hLine.setAttribute("stroke-width", "1");
hLine.setAttribute("stroke-dasharray", "4,2");

overlaySvg.appendChild(vLine);
overlaySvg.appendChild(hLine);

overlaySvg.addEventListener("mousemove", (e) => {
    const rect = overlaySvg.getBoundingClientRect();
    const { width, height } = getSvgSize();
    let px = e.clientX - rect.left;
    let py = e.clientY - rect.top;
    vLine.setAttribute("x1", px);
    vLine.setAttribute("y1", 0);
    vLine.setAttribute("x2", px);
    vLine.setAttribute("y2", height);
    hLine.setAttribute("x1", 0);
    hLine.setAttribute("y1", py);
    hLine.setAttribute("x2", width);
    hLine.setAttribute("y2", py);
});

overlaySvg.addEventListener("mouseleave", () => {
    vLine.setAttribute("x1", 0);
    vLine.setAttribute("x2", 0);
    hLine.setAttribute("y1", 0);
    hLine.setAttribute("y2", 0);
});

let pointsGroup = document.createElementNS(svgNS, "g");
overlaySvg.appendChild(pointsGroup);

export function renderAllPoints(newR) {
    R = parseFloat(newR);
    while (pointsGroup.firstChild) {
        pointsGroup.removeChild(pointsGroup.firstChild);
    }
    const { width, height } = getSvgSize();
    points.forEach(point => {
        const pixelCoords = toPixelCoords(point.x, point.y, width, height);
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", pixelCoords.px);
        circle.setAttribute("cy", pixelCoords.py);
        circle.setAttribute("r", 4);
        circle.setAttribute("fill", point.color || "red");
        circle.setAttribute("title", `X=${point.x.toFixed(2)}, Y=${point.y.toFixed(2)}`);
        pointsGroup.appendChild(circle);
    });
}

overlaySvg.addEventListener("click", (e) => {
    R = parseFloat(rSelect.value);
    const rect = overlaySvg.getBoundingClientRect();
    const { width, height } = getSvgSize();
    let px = e.clientX - rect.left;
    let py = e.clientY - rect.top;
    let coords = toGraphCoords(px, py, width, height);
    const newPoint = {
        x: parseFloat(coords.x.toFixed(3)),
        y: parseFloat(coords.y.toFixed(3)),
        r: parseFloat(R),
        timestamp: new Date().toISOString(),
        color: "green"
    };
    points.push(newPoint);
    savePoints(points);
    renderAllPoints(R);
    shoot(coords.x.toFixed(3), coords.y.toFixed(3), R);
});

function shoot(x, y, R) {
    if (!checkY(y, overlayError)) {
        return;
    }
    let r = parseFloat(R);
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/api";
    let data = { "x": x, "y": y, "r": r };
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = data[key];
            form.appendChild(input);
        }
    }
    document.body.appendChild(form);
    form.submit();
}

function checkY(str, error) {
    if (-5 <= Number(str) && Number(str) <= 3) {
        error.style.display = "none";
        return true;
    } else {
        error.style.display = "block";
        error.textContent = "❌ Недопустимое значение y (от -5 до 3)";
        setTimeout(() => {
            error.style.display = "none";
        }, 3000);
        return false;
    }
}

function toGraphCoords(px, py, width, height) {
    const baseScale = 88 / R;
    const actualScale = (width / 440) * baseScale;
    let x = (px - width / 2) / actualScale;
    let y = -(py - height / 2) / actualScale;
    return { x, y };
}

function toPixelCoords(x, y, width, height) {
    const baseScale = 88 / R;
    const actualScale = (width / 440) * baseScale;
    let px = x * actualScale + width / 2;
    let py = -y * actualScale + height / 2;
    return { px, py };
}

export function clearAllPoints() {
    points = [];
    savePoints(points);
    renderAllPoints(R);
}

rSelect.addEventListener('change', function () {
    R = parseFloat(rSelect.value);
    renderAllPoints(R);
});

document.addEventListener("DOMContentLoaded", () => {
    renderAllPoints(R);
});
