export default function Result() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-primary-light/20 p-8 md:p-12">
      <h1 className="text-3xl font-bold text-primary-dark mb-8 border-b-2 border-highlight inline-block pb-1">
        Result & Conclusion
      </h1>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-primary-dark mb-4 border-b border-accent pb-2">Results</h2>
          <ul className="list-disc list-inside space-y-3 ml-4 text-primary-dark/80 leading-relaxed">
            <li>The Hysteresis (B-H) loop was successfully plotted on the CRO screen for different magnetic specimens.</li>
            <li>The Hysteresis Loss per cycle was calculated from the area of the loop.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary-dark mb-4 border-b border-accent pb-2">Conclusions</h2>
          <p className="mb-6 text-primary-dark/80">From the experimental observations, we can conclude that:</p>
          <ol className="space-y-6">
            <li className="ml-4">
              <strong className="text-lg text-primary-dark block mb-2">1. Soft Iron</strong>
              <p className="text-primary-dark/80 leading-relaxed">It has a narrow hysteresis loop, indicating low retentivity and
                coercivity. This implies low hysteresis loss, making it suitable for making temporary magnets
                and transformer cores.</p>
            </li>
            <li className="ml-4">
              <strong className="text-lg text-primary-dark block mb-2">2. Steel</strong>
              <p className="text-primary-dark/80 leading-relaxed">It has a broad hysteresis loop with high retentivity and coercivity. This
                implies high hysteresis loss, making it suitable for permanent magnets but not for devices
                subjected to rapid AC cycles.</p>
            </li>
            <li className="ml-4">
              <strong className="text-lg text-primary-dark block mb-2">3. Hysteresis Loss</strong>
              <p className="text-primary-dark/80 leading-relaxed">Hysteresis loss is directly proportional to the frequency of the AC supply and the volume of the
                material.</p>
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
}
