import { motion } from "framer-motion";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Testimonials = () => {
  return (
    <section className="pt-16 pb-32 bg-surface relative content-center overflow-hidden">
      {/* Testimonials Header */}
      <div className="pb-4 px-4 mx-auto w-fit text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[500px] h-[200px] sm:h-[500px] bg-primary/20 rounded-full blur-[120px]" />
        <p className="text-primary opacity-55 text-9xl mb-8 -tracking-widest">
          ,,
        </p>
        <h1 className="text-2xl max-w-lg font-semibold">
          "LUXE Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          reprehenderit sequi corrupti saepe cum laboriosam."
        </h1>
        <div>
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            alt=""
            className="w-10 h-10 mx-auto mt-8 mb-2 object-cover rounded-full border-4 border-transparent outline outline-primary"
          />
          <h5 className="text-lg">omar hussein</h5>
          <p className="text-body-sm text-on-surface-variant tracking-widest">
            Full Stack Developer
          </p>
        </div>
      </div>

      {/* Subscribe */}
      <div className="relative overflow-hidden opacity-30 px-8 sm:px-12 py-7 sm:py-14 mt-20 mx-auto w-[90%] rounded-2xl glass sm:flex items-center justify-between flex-wrap pointer-events-none">
        <motion.div
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2) 50%, transparent)",
            skewX: -20,
          }}
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear",
          }}
        />
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">
            A Welcome Gift
            <br />
            <span className="bg-signature-gradient bg-clip-text text-transparent">
              for You
            </span>
          </h1>
          <p className="text-body-sm text-on-surface-variant mt-3 max-w-xs">
            Subscribe for early access to new collections and get{" "}
            <span className="font-bold text-primary">10% OFF</span> your first
            order. No noise, just luxury.
          </p>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row items-center gap-x-2 gap-y-4 w-full sm:w-auto">
            <div className="-mt-4 w-full sm:w-auto">
              <label
                htmlFor="input-demo-api-key"
                className="text-body-sm tracking-widest text-on-surface-variant uppercase"
              >
                Email
              </label>
              <Input
                id="input-demo-api-key"
                type="email"
                placeholder="jon@dom.com"
                className="glass ghost-border h-[58px] w-full shadow-inner text-on-surface-variant"
              />
            </div>
            <Button
              variant="secondary"
              className={"p-5 font-bold glow-primary w-full sm:w-fit"}
            >
              Claim My Discount
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
