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

// Generate the loop points
function getLoopData() {
    const mat = MATERIALS[state.material];

    // Physics: H is proportional to Current I = V / R
    // We assume H = (V/R) * scale_factor
    const h_amp = (state.voltage / state.resistance) * 2.0;

    // For display, we ensure it doesn't get too small to see
    const H_DISPLAY_MIN = 0.2;
    const h_disp_amp = Math.max(h_amp, H_DISPLAY_MIN);

    const points = [];
    const steps = 100;

    for (let i = 0; i < steps; i++) {
        let t = (i / steps) * Math.PI * 2;
        let sinT = Math.sin(t);
        let cosT = Math.cos(t);

        // Physical H (Actual value)
        let h_phys = h_amp * sinT;

        // Display H (Visual value)
        let h_disp_val = h_disp_amp * sinT;

        // Dynamic coercivity:
        // If the field is weak, coercivity drops effectively
        let eff_coercivity = mat.coercivity * (h_amp / (h_amp + mat.coercivity));

        // Lag function
        let lag = eff_coercivity * cosT;

        // B calculation (tanh saturation)
        // y = Saturation * tanh( (x - lag) / softness )
        let softness = mat.softness || 1.0;

        // Calculate B based on PHYSICAL H
        // (Display B will track this directly since B isn't clamped like H)
        let b_val = mat.saturation * Math.tanh((h_phys - lag) / softness);

        // Store both coordinate sets
        points.push({
            phys: { x: h_phys, y: b_val },
            disp: { x: h_disp_val, y: b_val }
        });
    }

    return points;
}

function calculateArea(points) {
    // Shoelace formula on PHYSICAL coordinates
    let area = 0;
    for (let i = 0; i < points.length; i++) {
        let j = (i + 1) % points.length;

        let p1 = points[i].phys;
        let p2 = points[j].phys;

        area += p1.x * p2.y;
        area -= p2.x * p1.y;
    }
    return Math.abs(area) / 2;
}

function updateCalculation(points) {
    if (!state.isOn) return;

    // Use passed points or generate if called externally
    const pts = points || getLoopData();
    const rawArea = calculateArea(pts);

    // Scale area to reasonable units
    const area = rawArea * 10;

    // Power Loss = V * f * Area
    const loss = area * state.frequency * 0.01;

    loopAreaDisplay.textContent = area.toFixed(2);
    lossDisplay.textContent = loss.toFixed(2);

    return { area, loss };
}

// Remove empty grid function
// function drawGrid() {}

// Animation Loop
let lastTime = 0;

function animate(timestamp) {
    if (!state.isOn) {
        lastTime = 0;
        return;
    }

    if (!lastTime) lastTime = timestamp;
    const dt = (timestamp - lastTime) / 1000; // Delta time in seconds
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;

    // Optimize: In a real app, we'd cache points and only regen if state changes.
    // For now, regen is fine, but we organize it better.
    const points = getLoopData();

    // Draw Beam Trace
    ctx.beginPath();
    ctx.strokeStyle = '#F2CF2A'; // Beam color
    ctx.lineWidth = 3;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#F2CF2A';

    points.forEach((p, i) => {
        let px = cx + p.disp.x * scaleX;
        let py = cy - p.disp.y * scaleY;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    });

    ctx.closePath();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Update Phase/Time
    // Speed: 1 cycle per (1/freq) seconds
    // Phase increment = (dt * freq) * 2PI
    const phaseInc = dt * state.frequency * 2 * Math.PI;
    state.time += phaseInc;

    // Draw Electron Dot
    // Find index based on current phase (0 to 2PI)
    let phase = state.time % (2 * Math.PI);
    let t_idx = Math.floor((phase / (2 * Math.PI)) * points.length) % points.length;
    let p = points[t_idx];

    if (p) {
        let px = cx + p.disp.x * scaleX;
        let py = cy - p.disp.y * scaleY;

        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();
    }

    // Update stats once per frame
    updateCalculation(points);

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
