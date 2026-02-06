import React, { useMemo } from 'react';
import { useSimulationStore } from '../../../store/simulationStore';
import { MATERIALS, getLoopData, calculateArea, calculateLoss } from '../logic/physics';
import { Play, Square, RotateCcw, Zap, Activity, MousePointer2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const ControlPanel: React.FC = () => {
    const state = useSimulationStore();

    // Derived stats
    const { area, loss } = useMemo(() => {
        try {
            if (!state) return { area: 0, loss: 0 };
            // cast to any for compat
            const points = getLoopData(state as any);
            const a = calculateArea(points);
            const l = calculateLoss(a, state.frequency);
            return { area: a * 10, loss: l };
        } catch (e) {
            console.error("Physics calculation error:", e);
            return { area: 0, loss: 0 };
        }
    }, [state.voltage, state.resistance, state.material, state.frequency]);

    return (
        <div className="glass-panel p-6 flex flex-col gap-6 h-full font-sans overflow-y-auto">
            <h2 className="text-2xl font-bold flex items-center gap-2 neon-text text-primary">
                <Zap className="w-6 h-6" /> Controls
            </h2>

            {/* Power Controls */}
            <div className="flex gap-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => state.setIsOn(!state.isOn)}
                    className={`flex-1 py-3 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all ${state.isOn
                        ? 'bg-red-500/20 text-red-500 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                        : 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                        }`}
                >
                    {state.isOn ? <><Square className="w-5 h-5 fill-current" /> STOP</> : <><Play className="w-5 h-5 fill-current" /> START</>}
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={state.reset}
                    className="px-4 rounded-lg bg-surface border border-white/10 hover:bg-white/10 transition-colors"
                    title="Reset Simulation"
                >
                    <RotateCcw className="w-5 h-5" />
                </motion.button>
            </div>

            {/* Material Select */}
            <div className="space-y-2">
                <label className="text-sm text-gray-400 flex items-center gap-2">
                    <MousePointer2 className="w-4 h-4" /> Material
                </label>
                <select
                    value={state.material}
                    onChange={(e) => state.setMaterial(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 outline-none focus:border-primary/50 text-white"
                >
                    {Object.entries(MATERIALS).map(([key, mat]) => (
                        <option key={key} value={key}>{mat.name}</option>
                    ))}
                </select>
            </div>

            {/* Sliders */}
            <div className="space-y-6">
                <ControlSlider
                    label="Voltage (Vs)"
                    value={state.voltage}
                    min={1} max={20}
                    unit="V"
                    onChange={state.setVoltage}
                    icon={<Zap className="w-4 h-4 text-primary" />}
                />
                <ControlSlider
                    label="Resistance (R)"
                    value={state.resistance}
                    min={1} max={50}
                    unit="Ω"
                    onChange={state.setResistance}
                    icon={<Activity className="w-4 h-4 text-blue-400" />}
                />
                <ControlSlider
                    label="Frequency (f)"
                    value={state.frequency}
                    min={1} max={100}
                    unit="Hz"
                    onChange={state.setFrequency}
                    icon={<Activity className="w-4 h-4 text-purple-400" />}
                />
            </div>

            {/* Experimental Features Toggle */}
            <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5">
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-200">Experimental Features</span>
                    <span className="text-xs text-gray-500">Makes the graphics more realistic</span>
                </div>
                <button
                    onClick={() => state.setExperimentalFeatures(!state.experimentalFeatures)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${state.experimentalFeatures ? 'bg-primary' : 'bg-white/10'
                        }`}
                >
                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${state.experimentalFeatures ? 'translate-x-6' : 'translate-x-0'
                        }`} />
                </button>
            </div>

            {/* Stats */}
            <div className="mt-auto pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                <StatCard label="H-Loss" value={loss.toFixed(2)} unit="W" />
                <StatCard label="Loop Area" value={area.toFixed(2)} unit="T·A/m" />
            </div>
        </div>
    );
};

const ControlSlider: React.FC<{
    label: string;
    value: number;
    min: number;
    max: number;
    unit: string;
    onChange: (val: number) => void;
    icon: React.ReactNode;
}> = ({ label, value, min, max, unit, onChange, icon }) => (
    <div className="space-y-2">
        <div className="flex justify-between text-sm">
            <span className="text-gray-400 flex items-center gap-2">{icon} {label}</span>
            <span className="font-mono text-primary">{value} {unit}</span>
        </div>
        <input
            type="range"
            min={min} max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary/80 transition-all"
        />
    </div>
);

const StatCard: React.FC<{ label: string; value: string; unit: string }> = ({ label, value, unit }) => (
    <div className="bg-black/20 p-3 rounded-lg border border-white/5">
        <div className="text-xs text-gray-500 mb-1">{label}</div>
        <div className="font-mono text-xl text-white">{value} <span className="text-sm text-gray-500">{unit}</span></div>
    </div>
);
