export interface Material {
    name: string;
    coercivity: number;
    retentivity: number;
    saturation: number;
    softness?: number;
    color: string;
}

export const MATERIALS: Record<string, Material> = {
    soft_iron: { name: "Soft Iron", coercivity: 0.2, retentivity: 0.8, saturation: 1.0, color: "#4fc3f7" },
    steel: { name: "Hard Steel", coercivity: 0.6, retentivity: 0.6, saturation: 0.9, color: "#ffb74d" },
    cast_iron: { name: "Cast Iron", coercivity: 0.5, retentivity: 0.4, saturation: 0.7, color: "#a1887f" },
    ferrite: { name: "Ferrite", coercivity: 0.1, retentivity: 0.3, saturation: 0.5, color: "#e57373" }
};

export interface SimulationState {
    isOn: boolean;
    material: string;
    resistance: number;
    voltage: number;
    frequency: number;
    time: number;
}

export interface Point {
    phys: { x: number; y: number };
    disp: { x: number; y: number };
}

export function getLoopData(state: SimulationState): Point[] {
    const mat = MATERIALS[state.material];
    const h_amp = (state.voltage / state.resistance) * 2.0;

    const H_DISPLAY_MIN = 0.2;
    const h_disp_amp = Math.max(h_amp, H_DISPLAY_MIN);

    const points: Point[] = [];
    const steps = 100;

    for (let i = 0; i < steps; i++) {
        let t = (i / steps) * Math.PI * 2;
        let sinT = Math.sin(t);
        let cosT = Math.cos(t);

        let h_phys = h_amp * sinT;
        let h_disp_val = h_disp_amp * sinT;

        // dynamic coercivity adjustment
        let eff_coercivity = mat.coercivity * (h_amp / (h_amp + mat.coercivity));
        let lag = eff_coercivity * cosT;

        let softness = mat.softness || 1.0;
        let b_val = mat.saturation * Math.tanh((h_phys - lag) / softness);

        points.push({
            phys: { x: h_phys, y: b_val },
            disp: { x: h_disp_val, y: b_val }
        });
    }

    return points;
}

export function calculateArea(points: Point[]): number {
    let area = 0;
    for (let i = 0; i < points.length; i++) {
        let j = (i + 1) % points.length;
        let p1 = points[i].phys;
        let p2 = points[j].phys;
        area += p1.x * p2.y;
        area -= p2.x * p1.y;
    }
    return Math.abs(area) / 2;
}

export function calculateLoss(area: number, frequency: number): number {
    return area * frequency * 0.01; // rough scaling factor
}
