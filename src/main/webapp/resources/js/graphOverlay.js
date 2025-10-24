const overlaySvg = document.getElementById("overlay-svg");
let rInput = document.getElementById("input-form:r-spinner_input");
let R =  Math.round(parseFloat(rInput.value) * 10) / 10;

function savePoints(points) {
    localStorage.setItem('savedPoints', JSON.stringify(points));
}

function loadPoints() {
    const saved = localStorage.getItem('savedPoints');
    return saved ? JSON.parse(saved) : [];
}

let points = [];

document.addEventListener("DOMContentLoaded", () => {
    points = loadPoints();

    rInput = document.getElementById("input-form:r-spinner_input");
    R =  Math.round(parseFloat(rInput.value) * 10) / 10;

    renderAllPoints(R);

    const clearBtn = document.getElementById("input-form:clear-btn");
    clearBtn.addEventListener("click", clearAllPoints);
});

function getSvgSize() {
    const rect = overlaySvg.getBoundingClientRect();
    return {width: rect.width, height: rect.height};
}

let vLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
vLine.setAttribute("stroke", "gray");
vLine.setAttribute("stroke-width", "1");
vLine.setAttribute("stroke-dasharray", "4,2");

let hLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
hLine.setAttribute("stroke", "gray");
hLine.setAttribute("stroke-width", "1");
hLine.setAttribute("stroke-dasharray", "4,2");

overlaySvg.appendChild(vLine);
overlaySvg.appendChild(hLine);

overlaySvg.addEventListener("mousemove", (e) => {
    const rect = overlaySvg.getBoundingClientRect();
    const {width, height} = getSvgSize();

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

let pointsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
overlaySvg.appendChild(pointsGroup);

function renderAllPoints(newR) {
    R = Math.round(parseFloat(newR) * 10) / 10;
    while (pointsGroup.firstChild) {
        pointsGroup.removeChild(pointsGroup.firstChild);
    }

    const {width, height} = getSvgSize();

    points.forEach(point => {
        const pixelCoords = toPixelCoords(point.x, point.y, width, height);

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", pixelCoords.px);
        circle.setAttribute("cy", pixelCoords.py);
        circle.setAttribute("r", 4);
        circle.setAttribute("fill", calcShoot(point.x, point.y, R) ? "green" : "red");
        circle.setAttribute("title", `X=${point.x.toFixed(2)}, Y=${point.y.toFixed(2)}`);

        pointsGroup.appendChild(circle);
    });
    savePoints(points);
}

function calcShoot(x, y, r) {
    const isTriangle = (x >= 0) && (x <= r) && (y <= 0) && (y >= x - r);
    const isRectangle = (x <= 0) && (x >= -r / 2) && (y <= 0) && (y >= -r);
    const isCircle = (x <= 0) && (y >= 0) && (x * x + y * y <= (r / 2) * (r / 2));

    return isTriangle || isRectangle || isCircle;
}

const overlayError = document.getElementById("overlay-error");

overlaySvg.addEventListener("click", (e) => {
    rInput = document.getElementById("input-form:r-spinner_input");
    R =  Math.round(parseFloat(rInput.value) * 10) / 10;;

    const rect = overlaySvg.getBoundingClientRect();
    const {width, height} = getSvgSize();

    let px = e.clientX - rect.left;
    let py = e.clientY - rect.top;

    let coords = toGraphCoords(px, py, width, height);

    if (!checkYValue(coords.y.toFixed(3))) {
        return;
    }

    const newPoint = {
        x: parseFloat(coords.x.toFixed(3)),
        y: parseFloat(coords.y.toFixed(3)),
        r: parseFloat(R),
        timestamp: new Date().toISOString(),
    };

    points.push(newPoint);
    renderAllPoints(R);

    shoot(coords.x.toFixed(3), coords.y.toFixed(3), R);
});

function onFormSubmitComplete(data) {
    if (data.status === "success") {
        const xInput = document.getElementById("input-form:x-input");
        const yInput = document.getElementById("input-form:y-input");
        const rInput = document.getElementById("input-form:r-spinner_input");

        const x = parseFloat(xInput.value);
        const y = parseFloat(yInput.value);
        const r = Math.round(parseFloat(rInput.value) * 10) / 10;

        if (!checkX()) {
            return;
        }

        if (!checkY()) {
            return;
        }


        const newPoint = {
            x: x,
            y: y,
            r: r,
            timestamp: new Date().toISOString()
        };

        points.push(newPoint);
        renderAllPoints(r);
    }
}

function shoot(x, y, R) {
    let r = parseFloat(R);

    addPointRemote([
        {name: 'x', value: x},
        {name: 'y', value: y},
        {name: 'r', value: r}
    ]);
}

function toGraphCoords(px, py, width, height) {
    const graphRange = R * 2.5;
    const actualScale = (width / 2) / graphRange;

    const cx = width / 2;
    const cy = height / 2;

    const x = (px - cx) / actualScale;
    const y = -(py - cy) / actualScale;
    return {x, y};
}

function toPixelCoords(x, y, width, height) {
    const graphRange = R * 2.5;
    const actualScale = (width / 2) / graphRange;

    const cx = width / 2;
    const cy = height / 2;

    let px = x * actualScale + cx;
    let py = -y * actualScale + cy;
    return {px, py};
}

function clearAllPoints() {
    points = [];
    localStorage.removeItem('savedPoints');
    renderAllPoints(R);
}