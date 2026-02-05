import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        aim: resolve(__dirname, 'aim.html'),
        theory: resolve(__dirname, 'theory.html'),
        procedure: resolve(__dirname, 'procedure.html'),
        simulation: resolve(__dirname, 'simulation.html'),
        observations: resolve(__dirname, 'observations.html'),
        result: resolve(__dirname, 'result.html'),
        references: resolve(__dirname, 'references.html')
      }
    }
  }
});
