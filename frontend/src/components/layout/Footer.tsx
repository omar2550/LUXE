const Footer = () => {
  return (
    <footer className="bg-surface ghost-border !border-b-0 !border-x-0 py-16">
      <div className="grid sm:grid-cols-4 gap-y-4 items-start container px-4 mx-auto">
        <div className="sm:col-span-3">
          <h1 className="text-xl font-bold mb-3">LUXE</h1>
          <p className="text-body-sm text-on-surface/50 sm:w-1/2">
            Defining the intersection of avant-grade technology and timeless
            craftsmanship for the modern digital nomad.
          </p>
        </div>

        <div className="sm:col-span-1 col-span-4">
          <h5 className="text-body-sm text-on-surface-variant mb-3 uppercase tracking-widest">
            Location
          </h5>
          <p className="text-body-sm text-on-surface/50">77std, love city</p>
        </div>

        <div className="col-span-4 ghost-border !border-b-0 !border-x-0 mt-10 pt-5 text-center">
          <p className="text-body-sm text-on-surface/50 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Luxe Digital curator. all rights
            reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
