/**
 * Hysteresis Loop Simulation Logic
 */

// Configuration for materials
const MATERIALS = {
    soft_iron: { name: "Soft Iron", coercivity: 0.2, retentivity: 0.8, saturation: 1.0, color: "#4fc3f7" },
    steel: { name: "Hard Steel", coercivity: 0.6, retentivity: 0.6, saturation: 0.9, color: "#ffb74d" },
    cast_iron: { name: "Cast Iron", coercivity: 0.5, retentivity: 0.4, saturation: 0.7, color: "#a1887f" },
    ferrite: { name: "Ferrite", coercivity: 0.1, retentivity: 0.3, saturation: 0.5, color: "#e57373" }
};

// State
let state = {
    isOn: false,
    material: 'soft_iron',
    resistance: 10,
    voltage: 5,
    frequency: 50,
    time: 0
};

// DOM Elements
const canvas = document.getElementById('hysteresisCanvas');
const ctx = canvas.getContext('2d');
const powerBtn = document.getElementById('powerBtn');
const materialSel = document.getElementById('materialSelect');
const resRange = document.getElementById('resistanceRange');
const volRange = document.getElementById('voltageRange');
const freqRange = document.getElementById('frequencyRange');
const loopAreaDisplay = document.getElementById('loopAreaDisplay');
const lossDisplay = document.getElementById('lossDisplay');
const addReadingBtn = document.getElementById('addReadingBtn');
const obsTableBody = document.querySelector('#obsTable tbody');
const clearTableBtn = document.getElementById('clearTableBtn');

// Scaling factors
let scaleX = 150; // Pixels per unit H
let scaleY = 150; // Pixels per unit B

// Animation Loop
let animationId;

function init() {
    resizeCanvas();
    setupListeners();
    drawGrid();
}

function resizeCanvas() {
    // Make canvas match display size for sharpness
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
}

function setupListeners() {
    powerBtn.addEventListener('click', togglePower);

    // Gain Knobs
    document.getElementById('gainX').addEventListener('input', (e) => {
        scaleX = 150 * parseFloat(e.target.value);
        if (state.isOn) animate(); // Redraw immediately if paused/static or just update
    });

    document.getElementById('gainY').addEventListener('input', (e) => {
        scaleY = 150 * parseFloat(e.target.value);
        if (state.isOn) animate();
    });

    materialSel.addEventListener('change', (e) => {
        state.material = e.target.value;
        updateCalculation();
    });

    resRange.addEventListener('input', (e) => {
        state.resistance = parseInt(e.target.value);
        document.getElementById('resistanceVal').textContent = state.resistance + ' Ω';
        updateCalculation();
    });

    volRange.addEventListener('input', (e) => {
        state.voltage = parseInt(e.target.value);
        document.getElementById('voltageVal').textContent = state.voltage + ' V';
        updateCalculation();
    });

    freqRange.addEventListener('input', (e) => {
        state.frequency = parseInt(e.target.value);
        document.getElementById('frequencyVal').textContent = state.frequency + ' Hz';
        updateCalculation();
    });

    addReadingBtn.addEventListener('click', addReading);
    clearTableBtn.addEventListener('click', () => {
        obsTableBody.innerHTML = '';
    });

    window.addEventListener('resize', resizeCanvas);
}

function togglePower() {
    state.isOn = !state.isOn;
    if (state.isOn) {
        powerBtn.textContent = "ON";
        powerBtn.style.backgroundColor = "#2E7D32"; // Green
        powerBtn.style.color = "white";
        addReadingBtn.disabled = false;
        animate();
    } else {
        powerBtn.textContent = "OFF";
        powerBtn.style.backgroundColor = "#C62828"; // Red
        powerBtn.style.color = "white";
        addReadingBtn.disabled = true;
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear screen
        drawGrid(); // Keep grid
    }
}

function getLoopData() {
    const mat = MATERIALS[state.material];

    // Physics Simulation Heuristic
    // H (X-axis) is proportional to Current I = V / R
    // B (Y-axis) follows H but with lag/hysteresis

    // Max H based on Voltage and Resistance
    // H_max ~ V / R
    const h_amp = (state.voltage / state.resistance) * 2.0;
    // Display normalization to avoid pixel collapse
    const H_DISPLAY_MIN = 0.2;  // minimum visible sweep
    const h_disp = Math.max(h_amp, H_DISPLAY_MIN);

    // Let's create a set of points for one cycle
    const points = [];
    const steps = 100;

    for (let i = 0; i < steps; i++) {
        let t = (i / steps) * Math.PI * 2;
        let sinT = Math.sin(t);
        let cosT = Math.cos(t);

        // H (Field Intensity)
        let x_phys = h_amp * sinT;
        let x_disp = h_disp * sinT;

        // Dynamic coercivity affected by Amplitude (Coercivity should scale with available magnetizing force)
        let eff_coercivity = mat.coercivity * (h_amp / (h_amp + mat.coercivity));

        // Continuous smooth lag function to avoid vertical jumps at tips
        // We use cos(t) to modulate the lag, ensuring the loop closes naturally at saturation
        let lag = eff_coercivity * cosT;

        // Magnetic Saturation
        let saturation = mat.saturation;

        // B calculation using tanh for saturation soft-clipping
        // y = Saturation * tanh( (x - lag) / softness )
        let softness = mat.softness || 1.0;
        let y = saturation * Math.tanh(
            (x_phys - lag) / softness
        );

        points.push({ x: x_disp, y });
    }

    return points;
}



function calculateArea(points) {
    // Shoelace formula
    let area = 0;
    for (let i = 0; i < points.length; i++) {
        let j = (i + 1) % points.length;
        area += points[i].x * points[j].y;
        area -= points[j].x * points[i].y;
    }
    return Math.abs(area) / 2;
}

function updateCalculation() {
    if (!state.isOn) return;

    const points = getLoopData();
    const rawArea = calculateArea(points);

    // Scale area to "Physics Units"
    // Heuristic scaling for display
    const area = rawArea * 10;

    // Hysteresis Loss Formula: Loss = Area (conceptually per volume)
    // P = f * Area * Volume_const
    // Let's assume Volume factor = 1 for simplicity or just output "Energy per cycle"

    const loss = area * state.frequency * 0.01; // Scale factor

    loopAreaDisplay.textContent = area.toFixed(2);
    lossDisplay.textContent = loss.toFixed(2);

    return { area, loss };
}

function drawGrid() {
    // CSS handles the grid background
}

function animate() {
    if (!state.isOn) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;

    const points = getLoopData();
    const mat = MATERIALS[state.material];

    ctx.beginPath();
    ctx.strokeStyle = '#F2CF2A'; // Beam color (Amber/Yellow)
    ctx.lineWidth = 3;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#F2CF2A';

    points.forEach((p, i) => {
        // Map simulation units to pixels
        let px = cx + p.x * scaleX;
        let py = cy - p.y * scaleY; // Y inverted for canvas

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    });

    ctx.closePath();
    ctx.stroke();

    // Reset shadow for text
    ctx.shadowBlur = 0;

    // Draw Current Point (the electron beam dot)
    // Moving based on time
    state.time += (state.frequency / 60) * 0.1; // Animation speed relative to freq
    let t_idx = Math.floor((state.time % (2 * Math.PI)) / (2 * Math.PI) * points.length) % points.length;
    let p = points[t_idx];

    if (p) {
        let px = cx + p.x * scaleX;
        let py = cy - p.y * scaleY;

        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();
    }

    updateCalculation(); // Update numbers live

    animationId = requestAnimationFrame(animate);
}

function addReading() {
    const { area, loss } = updateCalculation();
    const matName = MATERIALS[state.material].name;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${matName}</td>
        <td>${state.frequency}</td>
        <td>${state.resistance}</td>
        <td>${area.toFixed(2)}</td>
        <td>${loss.toFixed(4)}</td>
    `;

    obsTableBody.appendChild(row);
}

// Initial Call
init();
