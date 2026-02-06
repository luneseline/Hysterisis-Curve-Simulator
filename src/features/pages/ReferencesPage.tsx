import React from 'react';
import { BookOpen, Globe } from 'lucide-react';

export const ReferencesPage: React.FC = () => {
    return (
        <div className="glass-panel p-8 h-full overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 neon-text text-primary">
                <BookOpen className="w-8 h-8" /> References
            </h2>

            <div className="space-y-8 max-w-3xl">
                <section>
                    <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Textbooks</h3>
                    <ul className="space-y-3">
                        {[
                            "Griffiths, D. J. (2017). Introduction to Electrodynamics. Cambridge University Press.",
                            "Boylestad, R. L., & Nashelsky, L. (2013). Electronic Devices and Circuit Theory. Pearson.",
                            "Halliday, D., Resnick, R., & Walker, J. (2013). Fundamentals of Physics. Wiley."
                        ].map((ref, i) => (
                            <li key={i} className="text-gray-300 italic pl-4 border-l-2 border-primary/50">
                                {ref}
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
                        <Globe className="w-5 h-5" /> Online Resources
                    </h3>
                    <div className="space-y-4">
                        <a href="https://vlab.co.in" target="_blank" rel="noopener noreferrer" className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/5 group">
                            <div className="font-bold text-blue-400 group-hover:text-blue-300 underline mb-1">Virtual Labs (MHRD, Govt of India)</div>
                            <div className="text-sm text-gray-500">Inspiration for virtual experiment structure and pedagogy.</div>
                        </a>
                        <a href="https://ieeexplore.ieee.org" target="_blank" rel="noopener noreferrer" className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/5 group">
                            <div className="font-bold text-blue-400 group-hover:text-blue-300 underline mb-1">IEEE Xplore Digital Library</div>
                            <div className="text-sm text-gray-500">Standards for magnetic material testing and characterization.</div>
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
};
