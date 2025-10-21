function drawGraph(R) {
    const size = 440;
    const center = size / 2;
    const scale = 88 / R;

    const svg = `
    <svg width="${size}" height="${size}">
      <!-- Фигуры -->
      <polygon class="figures" points="${center},${center} ${center + R*scale},${center} ${center},${center + R*scale}" fill="#aed9eb" stroke="black"/>
      <rect class="figures" x="${center - R*scale/2}" y="${center}" width="${R*scale/2}" height="${R*scale}" fill="#aed9eb" stroke="black"/>
      <circle class="figures" cx="${center}" cy="${center}" r="${R*scale/2}" clip-path="url(#half-circle)" fill="#aed9eb" stroke="black"/>

      <defs>
        <clipPath id="half-circle">
          <rect x="${center - R*scale}" y="${center - R*scale}" width="${R*scale}" height="${R*scale}"/>
        </clipPath>
      </defs>

      <!-- Оси -->
      <line x1="${center}" x2="${center}" y1="${size}" y2="0" stroke="black"/>
      <text x="${center + 5}" y="15">y</text>
      <line x1="0" x2="${size}" y1="${center}" y2="${center}" stroke="black"/>
      <text x="${size - 10}" y="${center - 5}">x</text>

      <!-- Засечки по Y -->
      <line x1="${center-5}" x2="${center+5}" y1="${center - 2*R*scale}" y2="${center - 2*R*scale}" stroke="black"/>
      <text x="${center+8}" y="${center - 2*R*scale+5}">${2*R}</text>

      <line x1="${center-5}" x2="${center+5}" y1="${center - R*scale}" y2="${center - R*scale}" stroke="black"/>
      <text x="${center+8}" y="${center - R*scale+5}">${R}</text>

      <line x1="${center-5}" x2="${center+5}" y1="${center - R*scale/2}" y2="${center - R*scale/2}" stroke="black"/>
      <text x="${center+8}" y="${center - R*scale/2+5}">${R/2}</text>

      <line x1="${center-5}" x2="${center+5}" y1="${center + R*scale/2}" y2="${center + R*scale/2}" stroke="black"/>
      <text x="${center+8}" y="${center + R*scale/2+5}">-${R/2}</text>

      <line x1="${center-5}" x2="${center+5}" y1="${center + R*scale}" y2="${center + R*scale}" stroke="black"/>
      <text x="${center+8}" y="${center + R*scale+5}">-${R}</text>

      <line x1="${center-5}" x2="${center+5}" y1="${center + 2*R*scale}" y2="${center + 2*R*scale}" stroke="black"/>
      <text x="${center+8}" y="${center + 2*R*scale+5}">-${2*R}</text>

      <!-- Засечки по X -->
      <line x1="${center + 2*R*scale}" x2="${center + 2*R*scale}" y1="${center-5}" y2="${center+5}" stroke="black"/>
      <text x="${center + 2*R*scale-15}" y="${center-8}">${2*R}</text>

      <line x1="${center + R*scale}" x2="${center + R*scale}" y1="${center-5}" y2="${center+5}" stroke="black"/>
      <text x="${center + R*scale-10}" y="${center-8}">${R}</text>

      <line x1="${center + R*scale/2}" x2="${center + R*scale/2}" y1="${center-5}" y2="${center+5}" stroke="black"/>
      <text x="${center + R*scale/2-10}" y="${center-8}">${R/2}</text>

      <line x1="${center - R*scale/2}" x2="${center - R*scale/2}" y1="${center-5}" y2="${center+5}" stroke="black"/>
      <text x="${center - R*scale/2-20}" y="${center-8}">-${R/2}</text>

      <line x1="${center - R*scale}" x2="${center - R*scale}" y1="${center-5}" y2="${center+5}" stroke="black"/>
      <text x="${center - R*scale-15}" y="${center-8}">-${R}</text>

      <line x1="${center - 2*R*scale}" x2="${center - 2*R*scale}" y1="${center-5}" y2="${center+5}" stroke="black"/>
      <text x="${center - 2*R*scale-20}" y="${center-8}">-${2*R}</text>
    </svg>
  `;

    document.getElementById("graph-svg").innerHTML = svg;
}

document.addEventListener("DOMContentLoaded", () => {
    drawGraph(1);
});