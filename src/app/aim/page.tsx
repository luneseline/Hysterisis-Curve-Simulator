export default function Aim() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-primary-light/20 p-8 md:p-12">
      <h1 className="text-3xl font-bold text-primary-dark mb-8 border-b-2 border-highlight inline-block pb-1">
        Aim of the Experiment
      </h1>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-primary-dark mb-4">Primary Objectives:</h3>
          <ol className="list-decimal list-inside space-y-3 text-lg leading-relaxed text-primary-dark ml-4">
            <li>To draw the Hysteresis (B-H) curve of a magnetic specimen using a transformer setup.</li>
            <li>To calculate the Hysteresis Loss (energy dissipated per cycle) from the area of the B-H loop.</li>
            <li>To study and observe the effect of different magnetic materials (Soft Iron, Steel, etc.) on the shape of the hysteresis loop, retentivity, and coercivity.</li>
          </ol>
        </div>

        <div className="mt-8 p-6 bg-[#f4ece8] border border-primary-light/20 rounded-lg">
          <h4 className="text-lg font-bold text-primary-dark mb-4">Apparatus Required (Simulated):</h4>
          <ul className="list-disc list-inside space-y-2 text-primary-dark ml-4">
            <li>Step-down Transformer (with specimen core)</li>
            <li>Cathode Ray Oscilloscope (CRO)</li>
            <li>Resistors and Capacitors</li>
            <li>AC Power Supply</li>
            <li>Connecting Wires</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
