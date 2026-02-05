import React from 'react';
import { PlayCircle, Info, Zap, Activity, Cpu, MousePointer2 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

type Tab = 'simulation' | 'aim' | 'theory' | 'procedure' | 'result' | 'references' | 'home';

interface HomePageProps {
    onNavigate: (tab: Tab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <div className="h-full overflow-y-auto overflow-x-hidden relative font-sans scroll-smooth no-scrollbar">
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(34,197,94,0.05),_transparent_70%)]"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/30 rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                        }}
                        animate={{
                            y: [null, Math.random() * window.innerHeight],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col gap-24">

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            VIRTUAL LAB ENVIRONMENT V2.0
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                            Master the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-200 to-primary/50 animate-gradient-x">
                                Hysteresis Loop
                            </span>
                        </h1>

                        <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                            Experience electromagnetic physics like never before.
                            Real-time simulation, enterprise-grade accuracy, and interactive controls
                            to visualize B-H curves instantly.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onNavigate('simulation')}
                                className="px-8 py-4 bg-primary text-black font-bold rounded-xl flex items-center gap-3 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all"
                            >
                                <PlayCircle className="w-5 h-5" />
                                Launch Simulator
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onNavigate('aim')}
                                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-xl flex items-center gap-3 backdrop-blur-sm transition-all"
                            >
                                <Info className="w-5 h-5" />
                                Learn More
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Right Side Visual */}
                    <motion.div
                        style={{ y: y1 }}
                        initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative hidden lg:block perspective-1000"
                    >
                        {/* Abstract Glass Card Representation of the App */}
                        <div className="relative w-full aspect-square max-w-md mx-auto">
                            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-30 animate-pulse-slow"></div>

                            {/* Main Card */}
                            <div className="absolute inset-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 transform rotate-y-12 rotate-x-6 hover:rotate-0 transition-transform duration-700 ease-out border-t-white/20 border-l-white/20">
                                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                    </div>
                                    <div className="text-xs font-mono text-gray-500">SIMULATION_CORE</div>
                                </div>
                                {/* Mock Graph */}
                                <div className="h-48 border border-primary/20 bg-primary/5 rounded-lg relative overflow-hidden flex items-center justify-center">
                                    <Activity className="w-24 h-24 text-primary opacity-50" />
                                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_45%,rgba(34,197,94,0.1)_50%,transparent_55%)] bg-[length:200%_200%] animate-scan"></div>
                                </div>
                                <div className="mt-6 flex justify-between items-center">
                                    <div className="space-y-2">
                                        <div className="h-2 w-24 bg-white/10 rounded"></div>
                                        <div className="h-2 w-16 bg-white/10 rounded"></div>
                                    </div>
                                    <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
                                        <Zap className="w-4 h-4 text-primary" />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Element */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -right-4 top-20 bg-black/60 backdrop-blur-md border border-primary/30 p-4 rounded-xl shadow-xl hover:scale-105 transition-transform"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-2xl font-bold text-white">Soft Iron</div>
                                    <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">ACTIVE</div>
                                </div>
                                <div className="text-xs text-gray-400 mt-1">Material Properties Loaded</div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <motion.div
                    style={{ y: y2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {[
                        {
                            icon: Zap,
                            title: "Real-time Physics",
                            desc: "Powered by a custom 60fps hysteresis engine for accurate B-H lag simulation."
                        },
                        {
                            icon: Cpu,
                            title: "Smart Computing",
                            desc: "Automatic calculation of Loop Area, Retentivity, and Energy Loss per cycle."
                        },
                        {
                            icon: MousePointer2,
                            title: "Interactive Controls",
                            desc: "Fine-tune Voltage, Resistance, and Frequency with precision sliders."
                        }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:bg-white/10 hover:border-primary/30 transition-all group"
                        >
                            <div className="w-12 h-12 bg-black/40 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <feature.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer Section */}
                <div className="border-t border-white/5 pt-12 text-center pb-8">
                    <p className="text-gray-500 text-sm">
                        Designed for <span className="text-gray-300">Advanced Physics Labs</span> • CIClabs 2026
                    </p>
                </div>
            </div>
        </div>
    );
};
