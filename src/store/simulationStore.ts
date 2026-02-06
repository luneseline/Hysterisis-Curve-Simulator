import { create } from 'zustand';

// local interface to avoid circular deps
export interface SimulationState {
    isOn: boolean;
    material: string;
    resistance: number;
    voltage: number;
    frequency: number;
    time: number;
}

interface SimulationStore extends SimulationState {
    setVoltage: (v: number) => void;
    setResistance: (r: number) => void;
    setFrequency: (f: number) => void;
    setMaterial: (m: string) => void;
    setIsOn: (isOn: boolean) => void;
    setTime: (t: number | ((prev: number) => number)) => void;
    prankTime: number | null;
    experimentalFeatures: boolean;
    setPrankTime: (t: number | null) => void;
    dismissPrank: () => void;
    setExperimentalFeatures: (enabled: boolean) => void;
    reset: () => void;
}

export const useSimulationStore = create<SimulationStore>((set) => ({
    isOn: false,
    material: 'soft_iron',
    resistance: 10,
    voltage: 5,
    frequency: 50,
    time: 0,
    prankTime: null,
    experimentalFeatures: false,

    setVoltage: (v) => set({ voltage: v }),
    setResistance: (r) => set({ resistance: r }),
    setFrequency: (f) => set({ frequency: f }),
    setMaterial: (m) => set({ material: m }),
    setIsOn: (isOn) => set({ isOn }),
    setTime: (input) => set((state) => ({
        time: typeof input === 'function' ? input(state.time) : input
    })),
    setPrankTime: (t) => set({ prankTime: t }),
    dismissPrank: () => set({ prankTime: null }),
    setExperimentalFeatures: (enabled) => set({ experimentalFeatures: enabled, prankTime: null }), // Reset prank when toggling

    reset: () => set({
        isOn: false,
        time: 0,
        prankTime: null
    }),
}));
