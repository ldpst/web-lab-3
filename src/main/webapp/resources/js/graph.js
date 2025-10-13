const svgNS = "http://www.w3.org/2000/svg";

export function drawGraph(R) {
    const size = 440;
    const center = size / 2;
    const scale = 88 / R;

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("id", "graph-svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    const polygon = document.createElementNS(svgNS, "polygon");
    polygon.setAttribute("points", `${center},${center} ${center - R*scale},${center} ${center},${center - R*scale/2}`);
    polygon.setAttribute("fill", "lightblue");
    polygon.setAttribute("stroke", "black");
    svg.appendChild(polygon);

    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", center);
    rect.setAttribute("y", center);
    rect.setAttribute("width", R * scale);
    rect.setAttribute("height", R * scale);
    rect.setAttribute("fill", "lightgreen");
    rect.setAttribute("stroke", "black");
    svg.appendChild(rect);

    const defs = document.createElementNS(svgNS, "defs");
    const clipPath = document.createElementNS(svgNS, "clipPath");
    clipPath.setAttribute("id", "half-circle");
    const clipRect = document.createElementNS(svgNS, "rect");
    clipRect.setAttribute("x", center);
    clipRect.setAttribute("y", center - R * scale);
    clipRect.setAttribute("width", R * scale);
    clipRect.setAttribute("height", R * scale);
    clipPath.appendChild(clipRect);
    defs.appendChild(clipPath);
    svg.appendChild(defs);

    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", center);
    circle.setAttribute("cy", center);
    circle.setAttribute("r", R * scale / 2);
    circle.setAttribute("clip-path", "url(#half-circle)");
    circle.setAttribute("fill", "lightyellow");
    circle.setAttribute("stroke", "black");
    svg.appendChild(circle);

    const yLine = document.createElementNS(svgNS, "line");
    yLine.setAttribute("x1", center);
    yLine.setAttribute("x2", center);
    yLine.setAttribute("y1", size);
    yLine.setAttribute("y2", 0);
    yLine.setAttribute("stroke", "black");
    svg.appendChild(yLine);

    const yText = document.createElementNS(svgNS, "text");
    yText.textContent = "y";
    yText.setAttribute("x", center + 5);
    yText.setAttribute("y", 15);
    svg.appendChild(yText);

    const xLine = document.createElementNS(svgNS, "line");
    xLine.setAttribute("x1", 0);
    xLine.setAttribute("x2", size);
    xLine.setAttribute("y1", center);
    xLine.setAttribute("y2", center);
    xLine.setAttribute("stroke", "black");
    svg.appendChild(xLine);

    const xText = document.createElementNS(svgNS, "text");
    xText.textContent = "x";
    xText.setAttribute("x", size - 10);
    xText.setAttribute("y", center - 5);
    svg.appendChild(xText);

    const tickY = (val) => {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", center - 5);
        line.setAttribute("x2", center + 5);
        line.setAttribute("y1", center - val * scale);
        line.setAttribute("y2", center - val * scale);
        line.setAttribute("stroke", "black");
        svg.appendChild(line);
        const text = document.createElementNS(svgNS, "text");
        text.textContent = val;
        text.setAttribute("x", center + 8);
        text.setAttribute("y", center - val * scale + 5);
        svg.appendChild(text);
    };

    const tickX = (val) => {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", center + val * scale);
        line.setAttribute("x2", center + val * scale);
        line.setAttribute("y1", center - 5);
        line.setAttribute("y2", center + 5);
        line.setAttribute("stroke", "black");
        svg.appendChild(line);
        const text = document.createElementNS(svgNS, "text");
        text.textContent = val;
        text.setAttribute("x", center + val * scale - 10);
        text.setAttribute("y", center - 8);
        svg.appendChild(text);
    };

    tickY(R);
    tickY(-R);
    tickX(R);
    tickX(-R);

    const container = document.getElementById("graphSvgContainer");
    container.innerHTML = "";
    container.appendChild(svg);
}

document.addEventListener("DOMContentLoaded", () => {
    const rSelect = document.getElementById("r-select");
    drawGraph(parseFloat(rSelect.value));
    rSelect.addEventListener("change", () => drawGraph(parseFloat(rSelect.value)));
});
