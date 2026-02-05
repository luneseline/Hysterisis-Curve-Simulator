import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';

export const AimPage: React.FC = () => {
    return (
        <div className="glass-panel p-8 h-full overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 neon-text text-primary">
                <Target className="w-8 h-8" /> Aim of Experiment
            </h2>

            <div className="space-y-8">
                <section className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold text-secondary mb-4">Primary Objectives</h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-gray-200">
                            <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                            <span>To draw the Hysteresis (B-H) curve of a magnetic specimen using a transformer setup.</span>
                        </li>
                        <li className="flex items-start gap-3 text-gray-200">
                            <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                            <span>To calculate the Hysteresis Loss (energy dissipated per cycle) from the area of the B-H loop.</span>
                        </li>
                        <li className="flex items-start gap-3 text-gray-200">
                            <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                            <span>To study and observe the effect of different magnetic materials (Soft Iron, Steel, etc.) on the shape of the hysteresis loop, retentivity, and coercivity.</span>
                        </li>
                    </ul>
                </section>

                <section className="bg-primary/10 p-6 rounded-xl border border-primary/20">
                    <h3 className="text-xl font-bold text-primary mb-4">Apparatus Required (Simulated)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['Step-down Transformer', 'Cathode Ray Oscilloscope (CRO)', 'Resistors and Capacitors', 'AC Power Supply', 'Connecting Wires'].map((item) => (
                            <div key={item} className="flex items-center gap-2 text-white/80">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                {item}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};
