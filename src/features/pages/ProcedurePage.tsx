import React from 'react';
import { ClipboardList, ArrowRight } from 'lucide-react';

export const ProcedurePage: React.FC = () => {
    return (
        <div className="glass-panel p-8 h-full overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 neon-text text-primary">
                <ClipboardList className="w-8 h-8" /> Procedure
            </h2>

            <div className="space-y-6 max-w-4xl">
                {[
                    { title: "Select Magnetic Specimen", desc: "Choose a material from the dropdown (e.g., Soft Iron, Silicon Steel) to define the magnetic properties." },
                    { title: "Circuit Configuration", desc: "The transformer primary connects to the AC source via a rheostat (R1). The secondary connects to the integration circuit (R2, C)." },
                    { title: "CRO Setup", desc: "Set CRO to X-Y Mode. Voltage across R1 → X-input (H). Voltage across Capacitor → Y-input (B)." },
                    { title: "Start Simulation", desc: "Turn on the power supply using the START button." },
                    { title: "Adjust Parameters", desc: "Vary Resistance to change current (H). Change Frequency to see effects on Loop Area." },
                    { title: "Observation", desc: "Observe the B-H Curve. Note Retentivity (Y-intercept) and Coercivity (X-intercept)." },
                ].map((step, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary shrink-0">
                            {idx + 1}
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg mb-1">{step.title}</h3>
                            <p className="text-gray-400">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-secondary/10 border border-secondary/30 rounded-xl text-center">
                <p className="text-secondary font-medium flex items-center justify-center gap-2">
                    Ready to experiment? Go to the <span className="font-bold border-b border-secondary">Simulation</span> tab. <ArrowRight className="w-4 h-4" />
                </p>
            </div>
        </div>
    );
};
