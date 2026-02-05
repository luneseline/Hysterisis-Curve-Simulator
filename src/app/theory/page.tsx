import Image from 'next/image';

export default function Theory() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-primary-light/20 p-8 md:p-12 space-y-12">
      <h1 className="text-3xl font-bold text-primary-dark mb-0 border-b-2 border-highlight inline-block pb-1">
        Theory
      </h1>

      <section>
        <h2 className="text-2xl font-bold text-primary-dark mb-6 border-b border-accent pb-2">1. Magnetic Hysteresis</h2>
        <p className="mb-6 leading-relaxed">
          The phenomenon of the lagging of magnetic induction {"\\(B\\)"} behind the magnetizing field {"\\(H\\)"} when a
          specimen is taken through a cycle of magnetization is called <b className="text-primary">Hysteresis</b>.
        </p>

        <div className="text-center my-8 p-6 bg-white border border-primary-light/20 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold text-primary-dark mb-4">Parts of the Hysteresis Loop</h3>
          <div className="flex justify-center mb-4">
            <Image 
              src="/hysterisis.png" 
              alt="Hysteresis experiment circuit" 
              width={500} 
              height={350} 
              className="max-w-full h-auto"
            />
          </div>
          <p className="text-sm text-gray-600">
            Fig 1: Typical B-H Curve showing saturation, retentivity, and coercivity.
          </p>
        </div>

        <ul className="list-disc list-inside space-y-3 ml-4">
          <li><span className="font-bold text-primary">Retentivity (Residual Magnetism):</span> The value of {"\\(B\\)"} remaining in the specimen when {"\\(H\\)"} is reduced to zero.</li>
          <li><span className="font-bold text-primary">Coercivity (Coercive Force):</span> The value of reverse {"\\(H\\)"} required to reduce the residual {"\\(B\\)"} to zero.</li>
          <li><span className="font-bold text-primary">Saturation:</span> The point where increasing {"\\(H\\)"} does not further increase {"\\(B\\)"} significantly.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-primary-dark mb-6 border-b border-accent pb-2">2. Energy Loss & Work Done</h2>
        <p className="mb-6 leading-relaxed">
          When a material is taken through a cycle of magnetization, energy is spent in reorienting the
          molecular dipoles. This energy is dissipated as heat.
        </p>

        <div className="bg-[#fff8e1] p-8 border-l-8 border-highlight rounded-r-lg my-6">
          <h3 className="text-xl font-bold text-primary-dark mb-4">Work Done Formula</h3>
          <p className="mb-4">The work done per unit volume per cycle is numerically equal to the area of the B-H loop.</p>
          <div className="text-center my-6 text-xl font-serif">
            {"$$ W = \\oint H \\cdot dB $$"}
          </div>
          <p className="mb-4">Total Hysteresis Loss per second (Power Loss) is given by:</p>
          <div className="text-center my-6 text-xl font-serif">
            {"$$ P_{h} = V \\cdot f \\cdot \\text{Area of Loop} $$"}
          </div>
          <p className="font-semibold mb-2">Where:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-sm md:text-base">
            <li>{"\\(V\\)"} = Volume of the specimen ({"\\(m^3\\)"})</li>
            <li>{"\\(f\\)"} = Frequency of the AC supply ({"\\(Hz\\)"})</li>
            <li><b>Area</b> = Area enclosed by the loop ({"\\(Joules/m^3/cycle\\)"})</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-primary-dark mb-6 border-b border-accent pb-2">3. Transformer Setup Logic</h2>
        <p className="mb-4 leading-relaxed">In our experiment:</p>
        <ul className="list-disc list-inside space-y-3 ml-4">
          <li>The <span className="font-bold">Primary coil</span> carries current {"\\(I\\)"}, making {"\\(H \\propto I\\)"}. We measure voltage across a resistor {"\\(R\\)"} ({"\\(V_x \\propto I \\propto H\\)"}) given to the X-plates of CRO.</li>
          <li>The <span className="font-bold">Secondary coil</span> induces EMF {"\\(e = -N \\frac{d\\phi}{dt}\\)"}. An RC integrator gives voltage {"\\(V_y \\propto \\int e dt \\propto \\phi \\propto B\\)"}, given to the Y-plates.</li>
        </ul>
      </section>
    </div>
  );
}