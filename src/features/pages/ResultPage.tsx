import React from 'react';
import { Trophy, Lightbulb } from 'lucide-react';

export const ResultPage: React.FC = () => {
    return (
        <div className="glass-panel p-8 h-full overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 neon-text text-primary">
                <Trophy className="w-8 h-8" /> Result & Conclusion
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4">Experimental Results</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                        <li>The Hysteresis (B-H) loop was successfully plotted for different magnetic specimens.</li>
                        <li>Hysteresis Loss per cycle was calculated dynamically from the loop area.</li>
                        <li>Visualized impact of frequency and resistance on the curve shape.</li>
                    </ul>
                </div>

                <div className="bg-blue-500/10 p-6 rounded-xl border border-blue-500/20">
                    <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5" /> Inferences
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-bold text-white">Soft Iron</h4>
                            <p className="text-sm text-gray-400">Narrow loop, low retentivity/coercivity. Low hysteresis loss. Ideal for temporary magnets and transformers.</p>
                        </div>
                        <div className="border-t border-white/10 pt-2">
                            <h4 className="font-bold text-white">Steel</h4>
                            <p className="text-sm text-gray-400">Broad loop, high retentivity/coercivity. High hysteresis loss. Suitable for permanent magnets.</p>
                        </div>
                        <div className="border-t border-white/10 pt-2">
                            <h4 className="font-bold text-white">Dependencies</h4>
                            <p className="text-sm text-gray-400">Loss ∝ Frequency × Volume.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
