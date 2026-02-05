import React from 'react';
import { GraduationCap, Zap } from 'lucide-react';

export const TheoryPage: React.FC = () => {
    return (
        <div className="glass-panel p-8 h-full overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 neon-text text-primary">
                <GraduationCap className="w-8 h-8" /> Theory
            </h2>

            <div className="space-y-8">
                {/* Section 1 */}
                <section>
                    <h3 className="text-2xl font-bold text-white mb-4">1. Magnetic Hysteresis</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        The phenomenon of the lagging of magnetic induction <span className="font-serif italic text-primary">B</span> behind the magnetizing field <span className="font-serif italic text-primary">H</span> when a specimen is taken through a cycle of magnetization is called <strong className="text-white">Hysteresis</strong>.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-black/20 p-4 rounded-lg border border-white/10">
                            <h4 className="font-bold text-secondary mb-3">Key Terms</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="mb-2">
                                    <span className="block text-primary font-bold">Retentivity (Residual Magnetism):</span>
                                    <span className="text-gray-400">Value of <i className="font-serif">B</i> when <i className="font-serif">H</i> is reduced to 0.</span>
                                </li>
                                <li className="mb-2">
                                    <span className="block text-primary font-bold">Coercivity (Coercive Force):</span>
                                    <span className="text-gray-400">Reverse <i className="font-serif">H</i> required to reduce <i className="font-serif">B</i> to 0.</span>
                                </li>
                                <li>
                                    <span className="block text-primary font-bold">Saturation:</span>
                                    <span className="text-gray-400">Max <i className="font-serif">B</i> where increasing <i className="font-serif">H</i> has little effect.</span>
                                </li>
                            </ul>
                        </div>

                        {/* B-H Curve Diagram */}
                        <div className="bg-black/20 p-4 rounded-lg border border-white/10 relative overflow-hidden group">
                            <img
                                src="/hysteresis.png"
                                alt="B-H Hysteresis Loop Diagram"
                                className="w-full h-auto rounded-lg opacity-90 group-hover:opacity-100 transition-opacity"
                            />
                        </div>
                    </div>
                </section>

                {/* Formulas */}
                <section className="bg-yellow-500/10 border-l-4 border-yellow-500/50 p-6 rounded-r-xl">
                    <h3 className="text-xl font-bold text-yellow-500 mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5" /> Energy Loss & Work Done
                    </h3>
                    <p className="text-gray-300 mb-6">
                        When a material is taken through a cycle of magnetization, energy is spent in reorienting molecular dipoles.
                        The work done per unit volume per cycle is numerically equal to the area of the B-H loop.
                    </p>

                    <div className="flex flex-col md:flex-row gap-8 items-center justify-center py-4">
                        <div className="text-center">
                            <div className="text-sm text-gray-500 mb-2">Work Done Integral</div>
                            <div className="bg-black/30 px-6 py-4 rounded-lg text-2xl font-serif text-white border border-white/10 shadow-inner">
                                W = ∮ H · dB
                            </div>
                        </div>
                        <div className="text-2xl text-gray-600 hidden md:block">→</div>
                        <div className="text-center">
                            <div className="text-sm text-gray-500 mb-2">Power Loss Formula</div>
                            <div className="bg-black/30 px-6 py-4 rounded-lg text-2xl font-serif text-white border border-white/10 shadow-inner">
                                P<sub className="text-sm">h</sub> = V · f · Area
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm">
                        <div className="bg-white/5 p-2 rounded">
                            <span className="font-serif italic text-primary text-lg">V</span>
                            <div className="text-gray-500">Volume (m³)</div>
                        </div>
                        <div className="bg-white/5 p-2 rounded">
                            <span className="font-serif italic text-primary text-lg">f</span>
                            <div className="text-gray-500">Frequency (Hz)</div>
                        </div>
                        <div className="bg-white/5 p-2 rounded">
                            <span className="font-serif italic text-primary text-lg">Area</span>
                            <div className="text-gray-500">Loop Area (J/m³/cycle)</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
