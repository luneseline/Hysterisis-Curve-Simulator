import { create } from 'zustand';

export const useTestStore = create((set) => ({
    count: 0,
    inc: () => set((state) => ({ count: state.count + 1 })),
}));
