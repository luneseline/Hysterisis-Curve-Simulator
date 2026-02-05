"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Configuration for materials
const MATERIALS = {
  soft_iron: { name: "Soft Iron", coercivity: 0.2, retentivity: 0.8, saturation: 1.0, color: "#4fc3f7" },
  steel: { name: "Hard Steel", coercivity: 0.6, retentivity: 0.6, saturation: 0.9, color: "#ffb74d" },
  cast_iron: { name: "Cast Iron", coercivity: 0.5, retentivity: 0.4, saturation: 0.7, color: "#a1887f" },
  ferrite: { name: "Ferrite", coercivity: 0.1, retentivity: 0.3, saturation: 0.5, color: "#e57373" }
};

type MaterialKey = keyof typeof MATERIALS;

interface Reading {
  material: string;
  frequency: number;
  resistance: number;
  area: string;
  loss: string;
}

export default function Simulation() {
  const [isOn, setIsOn] = useState(false);
  const [material, setMaterial] = useState<MaterialKey>('soft_iron');
  const [resistance, setResistance] = useState(10);
  const [voltage, setVoltage] = useState(5);
  const [frequency, setFrequency] = useState(50);
  const [gainX, setGainX] = useState(1);
  const [gainY, setGainY] = useState(1);
  const [readings, setReadings] = useState<Reading[]>([]);
  const [stats, setStats] = useState({ area: 0, loss: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);
  const lastTimestampRef = useRef<number>(0);

  // Scaling factors
  const baseScale = 150;

  const getLoopData = useCallback(() => {
    const mat = MATERIALS[material];
    const h_amp = (voltage / resistance) * 2.0;
    const H_DISPLAY_MIN = 0.2;
    const h_disp_amp = Math.max(h_amp, H_DISPLAY_MIN);

    const points = [];
    const steps = 100;

    for (let i = 0; i < steps; i++) {
      let t = (i / steps) * Math.PI * 2;
      let sinT = Math.sin(t);
      let cosT = Math.cos(t);

      let h_phys = h_amp * sinT;
      let h_disp_val = h_disp_amp * sinT;
      let eff_coercivity = mat.coercivity * (h_amp / (h_amp + mat.coercivity));
      let lag = eff_coercivity * cosT;
      let softness = 1.0;
      let b_val = mat.saturation * Math.tanh((h_phys - lag) / softness);

      points.push({
        phys: { x: h_phys, y: b_val },
        disp: { x: h_disp_val, y: b_val }
      });
    }
    return points;
  }, [material, voltage, resistance]);

  const calculateArea = useCallback((points: any[]) => {
    let area = 0;
    for (let i = 0; i < points.length; i++) {
      let j = (i + 1) % points.length;
      let p1 = points[i].phys;
      let p2 = points[j].phys;
      area += p1.x * p2.y;
      area -= p2.x * p1.y;
    }
    return Math.abs(area) / 2;
  }, []);

  const updateStats = useCallback(() => {
    const pts = getLoopData();
    const rawArea = calculateArea(pts);
    const area = rawArea * 10;
    const loss = area * frequency * 0.01;
    setStats({ area, loss });
    return { area, loss };
  }, [getLoopData, calculateArea, frequency]);

  const animate = useCallback((timestamp: number) => {
    if (!isOn) return;

    if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
    const dt = (timestamp - lastTimestampRef.current) / 1000;
    lastTimestampRef.current = timestamp;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const points = getLoopData();

    // Draw Beam Trace
    ctx.beginPath();
    ctx.strokeStyle = '#F2CF2A';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#F2CF2A';

    points.forEach((p, i) => {
      let px = cx + p.disp.x * baseScale * gainX;
      let py = cy - p.disp.y * baseScale * gainY;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });

    ctx.closePath();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Update Phase/Time
    const phaseInc = dt * frequency * 2 * Math.PI;
    timeRef.current += phaseInc;

    // Draw Electron Dot
    let phase = timeRef.current % (2 * Math.PI);
    let t_idx = Math.floor((phase / (2 * Math.PI)) * points.length) % points.length;
    let p = points[t_idx];

    if (p) {
      let px = cx + p.disp.x * baseScale * gainX;
      let py = cy - p.disp.y * baseScale * gainY;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isOn, frequency, gainX, gainY, getLoopData]);

  useEffect(() => {
    if (isOn) {
      lastTimestampRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isOn, animate]);

  useEffect(() => {
    updateStats();
  }, [updateStats]);

  const togglePower = () => setIsOn(!isOn);

  const addReading = () => {
    const { area, loss } = updateStats();
    setReadings([...readings, {
      material: MATERIALS[material].name,
      frequency,
      resistance,
      area: area.toFixed(2),
      loss: loss.toFixed(4)
    }]);
  };

  const clearTable = () => {
    setReadings([]);
    setIsOn(false);
    timeRef.current = 0;
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-primary-light/20 p-6">
      <h1 className="text-3xl font-bold text-primary-dark mb-8 border-b-2 border-highlight inline-block pb-1">
        B-H Curve Simulation
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Panel: Controls & Circuit */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#fdfbf9] p-6 rounded-lg border border-primary-light/40 shadow-sm">
            <h3 className="text-lg font-bold text-primary-dark mb-4 border-b pb-2">Experimental Setup</h3>
            <div className="bg-white border border-gray-200 rounded p-2 shadow-inner">
              <Image src="/circuit.png" alt="Hysteresis experiment circuit" width={500} height={300} className="w-full h-auto" />
            </div>
          </div>

          <div className="bg-[#fdfbf9] p-6 rounded-lg border border-primary-light/40 shadow-sm">
            <h3 className="text-lg font-bold text-primary-dark mb-4 border-b pb-2">Experimental Controls</h3>
            
            <div className="space-y-4">
              <div className="control-group">
                <label className="block font-semibold text-sm mb-1">Magnetic Material</label>
                <select 
                  className="w-full p-2 border border-primary-light rounded bg-white"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value as MaterialKey)}
                >
                  <option value="soft_iron">Soft Iron (Low Coercivity)</option>
                  <option value="steel">Hard Steel (High Coercivity)</option>
                  <option value="ferrite">Ferrite</option>
                  <option value="cast_iron">Cast Iron</option>
                </select>
              </div>

              <div className="control-group">
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-sm">Rheostat Resistance (R)</label>
                  <span className="text-primary font-bold">{resistance} Ω</span>
                </div>
                <input 
                  type="range" min="5" max="50" value={resistance} 
                  onChange={(e) => setResistance(parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div className="control-group">
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-sm">Input Voltage (V)</label>
                  <span className="text-primary font-bold">{voltage} V</span>
                </div>
                <input 
                  type="range" min="1" max="20" value={voltage} 
                  onChange={(e) => setVoltage(parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div className="control-group">
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-sm">Frequency (f)</label>
                  <span className="text-primary font-bold">{frequency} Hz</span>
                </div>
                <input 
                  type="range" min="10" max="100" value={frequency} 
                  onChange={(e) => setFrequency(parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div className="pt-4 border-t flex items-center gap-4">
                <span className="font-semibold">Supply:</span>
                <button 
                  onClick={togglePower}
                  className={cn(
                    "px-6 py-2 rounded font-bold transition-all shadow-md",
                    isOn ? "bg-green-600 text-white" : "bg-red-600 text-white"
                  )}
                >
                  {isOn ? "ON" : "OFF"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: CRO & Data */}
        <div className="lg:col-span-7 space-y-8">
          <div className="text-center">
            <h3 className="text-lg font-bold text-primary-dark mb-2">CRO Screen (X-Y Mode)</h3>
            <div className="relative mx-auto max-w-[400px]">
              <div className="cro-display bg-[#1a1512] border-[6px] border-[#5d4037] rounded-xl aspect-square relative overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]">
                <div className="cro-grid absolute inset-0 pointer-events-none z-10 opacity-30" style={{
                  backgroundImage: `linear-gradient(rgba(236, 156, 157, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(236, 156, 157, 0.2) 1px, transparent 1px)`,
                  backgroundSize: '10% 10%'
                }}></div>
                <canvas 
                  ref={canvasRef} 
                  width={400} 
                  height={400} 
                  className="relative z-0 w-full h-full"
                />
              </div>

              {/* CRO Controls */}
              <div className="bg-[#2a201b] p-4 rounded-b-xl border border-[#5d4037] border-t-0 flex justify-around items-center text-[10px] text-[#d7ccc8] uppercase tracking-wider">
                <div className="flex flex-col items-center gap-1">
                  <span>Gain X</span>
                  <input type="range" min="0.5" max="2" step="0.1" value={gainX} onChange={(e) => setGainX(parseFloat(e.target.value))} className="w-16 accent-highlight" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span>Gain Y</span>
                  <input type="range" min="0.5" max="2" step="0.1" value={gainY} onChange={(e) => setGainY(parseFloat(e.target.value))} className="w-16 accent-highlight" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span>Focus</span>
                  <div className="w-4 h-4 rounded-full bg-[#5d4037] border border-[#8d6e63]"></div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs text-primary-light font-medium">
              X-Axis: Magnetizing Force (H) | Y-Axis: Flux Density (B)
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-primary-dark">Observations</h3>
              <button 
                onClick={addReading} 
                disabled={!isOn}
                className="bg-primary text-white px-4 py-2 rounded text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-light transition-colors"
              >
                + Add Reading
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-[#fdfbf7] p-4 rounded-lg border border-primary-light/40 text-center">
              <div className="space-y-1">
                <div className="text-xs text-primary-light font-bold">Area</div>
                <div className="text-xl font-bold text-accent">{stats.area.toFixed(2)}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-primary-light font-bold">Work (H-Loss)</div>
                <div className="text-xl font-bold text-accent">{stats.loss.toFixed(2)} <span className="text-[10px] text-primary-dark">J/cycle</span></div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-primary-light/20 shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="p-3 text-center">Material</th>
                    <th className="p-3 text-center">Freq (Hz)</th>
                    <th className="p-3 text-center">R (Ω)</th>
                    <th className="p-3 text-center">Area (mm²)</th>
                    <th className="p-3 text-center">Loss (J)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary-light/10">
                  {readings.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-400 italic">No readings added yet.</td>
                    </tr>
                  ) : (
                    readings.map((r, i) => (
                      <tr key={i} className="hover:bg-primary-light/5 transition-colors">
                        <td className="p-3 text-center">{r.material}</td>
                        <td className="p-3 text-center">{r.frequency}</td>
                        <td className="p-3 text-center">{r.resistance}</td>
                        <td className="p-3 text-center">{r.area}</td>
                        <td className="p-3 text-center">{r.loss}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            <button 
              onClick={clearTable}
              className="w-full py-2 text-xs font-bold text-primary-light border border-primary-light/40 rounded hover:bg-primary-light/10 transition-colors"
            >
              Reset Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
