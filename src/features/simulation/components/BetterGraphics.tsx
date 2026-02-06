import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useSimulationStore } from '../../../store/simulationStore';

export const BetterGraphics: React.FC = () => {
    const state = useSimulationStore();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let interval: number;
        if (state.prankTime && state.experimentalFeatures) {
            interval = window.setInterval(() => {
                const now = performance.now();
                if (now > state.prankTime!) {
                    setIsVisible(true);
                    clearInterval(interval);
                }
            }, 100);
        } else {
            setIsVisible(false);
        }
        return () => clearInterval(interval);
    }, [state.prankTime, state.experimentalFeatures]);

    const handleDismiss = () => {
        setIsVisible(false);
        // Small delay before resetting store to allow exit animation
        setTimeout(() => {
            state.dismissPrank();
        }, 500);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-6 right-6 z-50 max-w-sm"
                >
                    <div className="glass-panel p-4 flex items-start gap-4 border border-secondary/50 shadow-[0_0_20px_rgba(255,105,180,0.3)] bg-black/80 backdrop-blur-xl rounded-xl">
                        <div className="bg-secondary/20 p-2 rounded-full mt-1 flex items-center justify-center w-10 h-10">
                            <span className="text-2xl animate-pulse">😸</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-secondary text-lg">CJ Says...</h3>
                            <p className="text-white/90 text-sm leading-relaxed mt-1">
                                Hehe Bauni PR review nahi karti 🎀
                            </p>
                        </div>
                        <button
                            onClick={handleDismiss}
                            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
