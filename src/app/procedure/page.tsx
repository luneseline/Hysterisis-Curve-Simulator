import Link from 'next/link';

export default function Procedure() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-primary-light/20 p-8 md:p-12">
      <h1 className="text-3xl font-bold text-primary-dark mb-8 border-b-2 border-highlight inline-block pb-1">
        Experimental Procedure
      </h1>

      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-primary-dark mb-4 border-b border-accent pb-2">Step-by-Step Guide</h2>
        <ol className="space-y-6">
          <li className="ml-4">
            <strong className="text-lg text-primary-dark block mb-2">1. Select Magnetic Specimen:</strong>
            <p className="text-primary-dark/80 leading-relaxed">Choose a material from the dropdown (e.g., Soft Iron, Silicon Steel) to define the magnetic
              properties of calculation.</p>
          </li>
          <li className="ml-4">
            <strong className="text-lg text-primary-dark block mb-2">2. Circuit Configuration:</strong>
            <p className="text-primary-dark/80 leading-relaxed">Ensure the circuit is connected properly. The transformer primary is connected to the AC
              source via a rheostat (R1). The secondary is connected to the integration circuit (R2, C).
            </p>
          </li>
          <li className="ml-4">
            <strong className="text-lg text-primary-dark block mb-2">3. CRO Setup:</strong>
            <p className="text-primary-dark/80 leading-relaxed">Set the CRO to <b>X-Y Mode</b>. Connect the voltage across the series resistor to the X-input
              (representing H) and the voltage across the capacitor to the Y-input (representing B).</p>
          </li>
          <li className="ml-4">
            <strong className="text-lg text-primary-dark block mb-2">4. Start Simulation:</strong>
            <p className="text-primary-dark/80 leading-relaxed">Turn on the power supply using the Toggle Switch.</p>
          </li>
          <li className="ml-4">
            <strong className="text-lg text-primary-dark block mb-2">5. Adjust Parameters:</strong>
            <p className="text-primary-dark/80 leading-relaxed mb-2">Vary the <b>Resistance</b> slider to change the current limited to the primary coil. Observe
              how the loop expands or contracts.</p>
            <p className="text-primary-dark/80 leading-relaxed">Change the <b>Frequency</b> to see its effect on the loop area and loss.</p>
          </li>
          <li className="ml-4">
            <strong className="text-lg text-primary-dark block mb-2">6. Observation:</strong>
            <p className="text-primary-dark/80 leading-relaxed">Observe the B-H Curve on the CRO screen. Note its Retentivity (intercept on Y-axis) and
              Coercivity (intercept on X-axis).</p>
          </li>
          <li className="ml-4">
            <strong className="text-lg text-primary-dark block mb-2">7. Record Readings:</strong>
            <p className="text-primary-dark/80 leading-relaxed">Click the <b>"Add Reading"</b> button to record the current Material, Resistance, Frequency,
              and Calculated Loss into the Observation Table.</p>
          </li>
          <li className="ml-4">
            <strong className="text-lg text-primary-dark block mb-2">8. Calculate Loss:</strong>
            <p className="text-primary-dark/80 leading-relaxed">The system automatically calculates the area of the loop and computes the Hysteresis Loss
              using the formula.</p>
          </li>
        </ol>
      </div>

      <div className="mt-12 text-center">
        <Link href="/simulation" className="btn">
          Proceed to Simulation
        </Link>
      </div>
    </div>
  );
}
