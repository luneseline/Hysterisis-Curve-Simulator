export default function References() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-primary-light/20 p-8 md:p-12">
      <h1 className="text-3xl font-bold text-primary-dark mb-8 border-b-2 border-highlight inline-block pb-1">
        References
      </h1>

      <div className="space-y-12">
        <section>
          <h3 className="text-xl font-bold text-primary-dark mb-4">Textbooks</h3>
          <ul className="list-disc list-inside space-y-3 ml-4 text-primary-dark/80 leading-relaxed">
            <li>Griffiths, D. J. (2017). <em>Introduction to Electrodynamics</em>. Cambridge University Press.</li>
            <li>Boylestad, R. L., & Nashelsky, L. (2013). <em>Electronic Devices and Circuit Theory</em>. Pearson.</li>
            <li>Halliday, D., Resnick, R., & Walker, J. (2013). <em>Fundamentals of Physics</em>. Wiley.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-primary-dark mb-4">Online Resources</h3>
          <ul className="list-disc list-inside space-y-3 ml-4 text-primary-dark/80 leading-relaxed">
            <li>
              <a href="https://vlab.co.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Virtual Labs (MHRD, Govt of India)
              </a> - Inspiration for virtual experiment structure.
            </li>
            <li>
              <a href="https://ieeexplore.ieee.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                IEEE Xplore Digital Library
              </a> - Standards for magnetic material testing.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
