import React, { useEffect, useRef } from 'react';
import { useSimulationStore } from '../../../store/simulationStore';
import { getLoopData } from '../logic/physics';

export const SimulationCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);

    const state = useSimulationStore();

    // Prank initialization
    useEffect(() => {
        if (state.isOn && !state.prankTime && state.experimentalFeatures) {
            const delay = Math.random() * 5000 + 5000; // 5-10s
            state.setPrankTime(performance.now() + delay);
        }
    }, [state.isOn, state.prankTime, state.setPrankTime, state.experimentalFeatures]);

    const animate = (timestamp: number) => {
        const currentState = useSimulationStore.getState();

        if (!currentState.isOn) {
            lastTimeRef.current = 0;
            return;
        }

        if (!lastTimeRef.current) lastTimeRef.current = timestamp;
        const dt = (timestamp - lastTimeRef.current) / 1000;
        lastTimeRef.current = timestamp;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (canvas && ctx) {
            const parent = canvas.parentElement;
            if (parent && (canvas.width !== parent.clientWidth || canvas.height !== parent.clientHeight)) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }

            const width = canvas.width;
            const height = canvas.height;
            const cx = width / 2;
            const cy = height / 2;
            const scaleX = 150;
            const scaleY = 150;

            ctx.clearRect(0, 0, width, height);

            const points = getLoopData(currentState);

            // Draw Beam
            ctx.beginPath();
            ctx.strokeStyle = '#F2CF2A';
            ctx.lineWidth = 3;
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#F2CF2A';

            points.forEach((p, i) => {
                let px = cx + p.disp.x * scaleX;
                let py = cy - p.disp.y * scaleY;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            });

            ctx.closePath();
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Update Time
            const phaseInc = dt * currentState.frequency * 2 * Math.PI;
            currentState.setTime((prev) => prev + phaseInc);

            // Draw Dot
            let phase = currentState.time % (2 * Math.PI);
            let t_idx = Math.floor((phase / (2 * Math.PI)) * points.length) % points.length;
            let p = points[t_idx];

            if (p) {
                let px = cx + p.disp.x * scaleX;
                let py = cy - p.disp.y * scaleY;
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(px, py, 6, 0, Math.PI * 2);
                ctx.fill();
            }
            // NO PRANK DRAWING HERE
        }

        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (state.isOn) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            const cvs = canvasRef.current;
            const ctx = cvs?.getContext('2d');
            if (cvs && ctx) ctx.clearRect(0, 0, cvs.width, cvs.height);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [state.isOn]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full block"
        />
    );
};
