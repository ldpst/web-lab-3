const overlaySvg = document.getElementById("overlay-svg");
let rInput = document.getElementById("input-form:r-spinner_input");
let R = rInput.value;

// function savePoints(points) {
//     localStorage.setItem('savedPoints', JSON.stringify(points));
// }
//
// function loadPoints() {
//     const saved = localStorage.getItem('savedPoints');
//     return saved ? JSON.parse(saved) : [];
// }

// let points = loadPoints();
let points = [];

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
    R = newR;
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
        circle.setAttribute("fill", point.color || "red");
        circle.setAttribute("title", `X=${point.x.toFixed(2)}, Y=${point.y.toFixed(2)}`);

        pointsGroup.appendChild(circle);
    });
}

overlaySvg.addEventListener("click", (e) => {
    rInput = document.getElementById("input-form:r-spinner_input");
    R = rInput.value;

    const rect = overlaySvg.getBoundingClientRect();
    const {width, height} = getSvgSize();

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

    // savePoints(points);

    renderAllPoints(R);

    shoot(coords.x.toFixed(3), coords.y.toFixed(3), R);
});

const overlayError = document.getElementById("overlay-error");

function shoot(x, y, R) {
    if (!checkY(y, overlayError)) {
        return;
    }

    let r = parseFloat(R);
    console.log(x, y, r);
    const form = document.createElement("form");

    addPointRemote([
        { name: 'x', value: x },
        { name: 'y', value: y },
        { name: 'r', value: r }
    ]);
}

function checkY(str, error) {
    if (-3 <= Number(str) && Number(str) <= 5) {
        error.style.display = "none";
        return true;
    } else {
        error.style.display = "block";
        error.textContent = "❌ Недопустимое значение y (от -3 до 5)";
        setTimeout(() => {
            error.style.display = "none";
        },3000)
        return false;
    }
}

function toGraphCoords(px, py, width, height) {
    const graphRange = R * 2.5;
    const actualScale = (width / 2) / graphRange;

    const cx = width / 2;
    const cy = height / 2;

    const x = (px - cx) / actualScale;
    const y = -(py - cy) / actualScale;
    return { x, y };
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
    // savePoints(points);
    renderAllPoints(R);
}

document.addEventListener("DOMContentLoaded", ()=>{
    renderAllPoints(rInput.value);
});