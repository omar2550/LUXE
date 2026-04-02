import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <section className="bg-surface px-2 py-16 xs:px-4">
      <div>
        <h1 className="text-4xl xs:text-display-lg font-bold">
          The{" "}
          <span className="bg-signature-gradient bg-clip-text text-transparent">
            Universe
          </span>{" "}
          of Design
        </h1>
        <p className="text-sm text-on-surface-variant/60 sm:w-1/2 mt-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          quaerat quos aperiam laudantium dolorem corporis sint officiis porro,
          asperiores facere perspiciatis quod, nobis alias odit mollitia aliquam
          dolor deleniti eius.
        </p>
      </div>

      <div className="sm:grid grid-cols-3 space-y-4 sm:space-y-0 gap-4 mt-16">
        <div className="relative col-span-2">
          <img
            src="/1.png"
            alt="image"
            className="bg-cover w-full h-full rounded-md ghost-border !border-2 xs:!border-4"
          />
          <div className="glass rounded-md absolute bottom-5 left-3 w-[90%] p-3 xs:p-5 flex items-center justify-between">
            <div>
              <span className="uppercase text-[10px] xs:text-body-sm tracking-widest text-primary">
                Premium Ware
              </span>
              <h2 className="text-lg xs:text-2xl">Fashion</h2>
            </div>
            <div className="w-7 h-7 xs:w-10 xs:h-10 rounded-full bg-signature-gradient flex items-center justify-center glow-primary cursor-pointer hover-scale">
              <ArrowUpRight className="text-surface" size={16} />
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src="/1.png"
            alt="image"
            className="bg-cover w-full h-full rounded-md ghost-border !border-2 xs:!border-4"
          />
          <div className="glass rounded-[10px] absolute bottom-5 left-3 w-[90%] p-3 xs:p-5">
            <h2 className="text-lg xs:text-2xl">Electronics</h2>
            <p className="text-body-sm xs:text-sm text-on-surface-variant/60 mt-1 xs:mt-3 line-clamp-1 xs:line-clamp-none">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
        </div>
      </div>

      <div className="sm:grid grid-cols-3 space-y-4 sm:space-y-0 gap-4 mt-6">
        <div className="relative sm:max-h-96">
          <img
            src="/1.png"
            alt="image"
            className="bg-cover w-full h-full rounded-md ghost-border !border-2 xs:!border-4"
          />
          <div className="glass rounded-xl absolute top-5 right-3 p-2">
            <h2 className="text-sm">Home</h2>
          </div>
        </div>
        <div className="relative col-span-2 sm:max-h-96">
          <img
            src="/1.png"
            alt="image"
            className="bg-cover w-full h-full rounded-md ghost-border !border-2 xs:!border-4"
          />
          <div
            className="glass rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit p-3 
          xs:px-10 xs:py-5 xs:space-y-3 text-center"
          >
            <span className="uppercase hidden xs:block text-[10px] tracking-widest text-tertiary">
              Essential Accents
            </span>
            <h2 className="text-lg xs:text-2xl font-bold tracking-wide">
              Accessories
            </h2>
            <div className="w-10 h-1 hidden xs:block bg-signature-gradient mx-auto"></div>
            <Link
              to={"/"}
              className="text-primary flex items-center gap-2 justify-center text-[10px] xs:text-body-sm"
            >
              <span> View Collection</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="sm:grid grid-cols-3 space-y-4 sm:space-y-0 gap-4 mt-6">
        <div className="relative sm:max-h-96">
          <img
            src="/1.png"
            alt="image"
            className="bg-cover w-full h-full rounded-md ghost-border !border-2 xs:!border-4"
          />
          <div className="glass rounded-md absolute bottom-5 left-3 w-[90%] p-3">
            <h2 className="text-lg">art & Curation</h2>
            <p className="text-body-sm text-on-surface-variant/60 mt-1 xs:mt-3 line-clamp-1">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
        </div>
        <div className="relative sm:max-h-96">
          <img
            src="/1.png"
            alt="image"
            className="bg-cover w-full h-full rounded-md ghost-border !border-2 xs:!border-4"
          />
          <div className="glass rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 w-[90%] text-center p-3">
            <h2 className="text-sm uppercase">fragrance</h2>
          </div>
        </div>
        <div className="sm:max-h-96">
          <img
            src="/1.png"
            alt="image"
            className="bg-cover w-full h-full rounded-md ghost-border !border-2 xs:!border-4"
          />
        </div>
      </div>
    </section>
  );
};

export default Categories;
