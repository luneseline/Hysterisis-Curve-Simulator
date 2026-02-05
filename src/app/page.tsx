import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-primary-light/20 p-8 md:p-16 text-center">
      <h1 className="text-4xl font-bold text-primary-dark mb-4 border-b-4 border-highlight inline-block pb-1">
        Hysteresis Loop Experiment
      </h1>
      <p className="text-lg text-primary font-medium tracking-widest mb-8">
        CICLABS VIRTUAL LABORATORY
      </p>

      <div className="my-12 mx-auto max-w-[500px] h-[300px] bg-white border-2 border-primary rounded-lg relative flex items-center justify-center overflow-hidden shadow-inner">
        <Image 
          src="/logo.png" 
          alt="Hysteresis experiment circuit" 
          width={400} 
          height={240} 
          className="object-contain"
        />
      </div>

      <div className="max-w-3xl mx-auto mb-12 text-justify space-y-4 leading-relaxed text-primary-dark">
        <p className="font-bold">
          Welcome to the CICLABS Physics Simulation.
        </p>
        <p>
          This experiment is designed to study the <strong>Hysteresis Curve</strong> of various magnetic
          materials.
          Using a transformer setup and a CRO, we can visualize the lag of Magnetic Flux Density (B) behind
          the Magnetic Field Intensity (H), known as Hysteresis.
          This property is crucial for understanding energy loss in electrical machines like transformers and
          motors.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/simulation" className="btn">
          Start Experiment
        </Link>
        <Link href="/aim" className="btn btn-secondary">
          Experiment Details
        </Link>
      </div>
    </div>
  );
}
