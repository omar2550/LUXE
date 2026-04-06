import { motion } from "framer-motion";

const ComingSoon = () => {
  // Text Animation Settings
  const fadeInUp: any = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <div className="relative min-h-screen bg-surface font-body text-on-surface overflow-hidden flex flex-col items-center justify-center p-4 xs:p-6">
      {/* Background Aesthetics: Ambient Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-dim opacity-10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary opacity-5 blur-[100px] rounded-full" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl text-center">
        {/* Logo Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <h2 className="font-display text-[1.5rem] tracking-[0.4em] uppercase text-primary">
            Luxe{" "}
            <span className="text-on-surface-variant font-light text-sm tracking-widest block mt-1">
              Premium Experience
            </span>
          </h2>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          {...fadeInUp}
          className="font-display text-display-lg mb-6 bg-signature-gradient bg-clip-text text-transparent"
        >
          The Future of Luxury <br /> is Coming.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          {...fadeInUp}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-on-surface-variant text-lg mb-12 max-w-md mx-auto leading-relaxed"
        >
          We are refining a unique experience tailored to your taste. Stay tuned
          for our official launch into the world of true luxury.
        </motion.p>

        {/* Countdown / Stats (Optional) */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 flex justify-center gap-8"
        >
          <div className="flex flex-col items-center">
            <span className="text-primary font-display text-2xl">05</span>
            <span className="text-on-surface-variant text-xs uppercase tracking-widest">
              Days
            </span>
          </div>
          <div className="w-[1px] h-10 bg-outline-variant mt-2" />
          <div className="flex flex-col items-center">
            <span className="text-primary font-display text-2xl">12</span>
            <span className="text-on-surface-variant text-xs uppercase tracking-widest">
              Hours
            </span>
          </div>
          <div className="w-[1px] h-10 bg-outline-variant mt-2" />
          <div className="flex flex-col items-center">
            <span className="text-primary font-display text-2xl">48</span>
            <span className="text-on-surface-variant text-xs uppercase tracking-widest">
              Mins
            </span>
          </div>
        </motion.div>
      </div>

      {/* Minimalist Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 text-on-surface-variant/30 text-body-sm tracking-widest uppercase"
      >
        © 2026 LUXE Premium — Minimalist Excellence
      </motion.footer>
    </div>
  );
};

export default ComingSoon;
