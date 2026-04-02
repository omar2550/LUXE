/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    // 🎨 COLORS
    colors: {
      border: "var(--border)",
      ring: "var(--ring)",
      muted: "var(--muted)",
      popover: "var(--popover)",
      destructive: "var(--destructive)",

      // Base
      surface: "#0e0e11",

      // Surface System (Tonal Layering)
      "surface-container": {
        lowest: "#0a0a0c",
        low: "#131316",
        highest: "#25252a",
      },

      // Brand (Jewel tones)
      primary: {
        DEFAULT: "#b6a0ff",
        dim: "#7e51ff",
      },
      secondary: "#ff6c95",
      tertiary: "#81ecff",

      // Text
      "on-surface": "#f0edf1",
      "on-surface-variant": "#acaaae",

      // Effects
      "surface-variant": "rgba(45, 44, 48, 0.6)",
      "outline-variant": "rgba(72, 71, 75, 0.15)",
    },

    // 🔤 TYPOGRAPHY
    fontFamily: {
      display: ["Manrope", "sans-serif"],
      body: ["Plus Jakarta Sans", "sans-serif"],
    },

    fontSize: {
      "display-lg": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      "body-sm": ["0.75rem", { lineHeight: "1.6" }],
    },

    // 📏 SPACING (Premium rhythm)
    spacing: {
      4: "1.4rem",
      6: "2rem",
      12: "3rem",
      20: "5rem",
      24: "8.5rem",
    },

    // 🔵 RADIUS
    borderRadius: {
      lg: "1rem",
      xl: "1.5rem",
      full: "9999px",
    },

    // 🌈 GRADIENT
    backgroundImage: {
      "signature-gradient": "linear-gradient(135deg, #b6a0ff 0%, #ff6c95 100%)",
    },

    // 🌫️ SHADOWS (Ambient only)
    boxShadow: {
      ambient: "0 40px 40px -10px rgba(126, 81, 255, 0.06)",
      "inner-soft": "inset 0 2px 4px rgba(0,0,0,0.06)",
    },

    screens: {
      xs: "400px",
    },

    // ✨ BLUR
    backdropBlur: {
      glass: "24px",
    },

    letterSpacing: {
      tightest: "-0.02em",
    },
  },
};
export const plugins = [
  function ({ addUtilities }) {
    addUtilities({
      // 🧊 Glassmorphism
      ".glass": {
        backgroundColor: "rgba(45, 44, 48, 0.6)",
        backdropFilter: "blur(24px)",
      },

      // 👻 Ghost Border
      ".ghost-border": {
        border: "1px solid rgba(72, 71, 75, 0.15)",
      },

      ".ghost-border-focus": {
        border: "1px solid rgba(72, 71, 75, 0.15)",
        transition: "border-color 0.3s ease",
      },

      ".ghost-border-focus:focus": {
        borderColor: "#b6a0ff",
      },

      // ✨ Hover Interaction
      ".hover-scale": {
        transition: "transform 0.3s ease",
      },

      ".hover-scale:hover": {
        transform: "scale(1.02)",
      },

      ".glow-primary": {
        boxShadow: "0 0 30px rgba(182, 160, 255, 0.25)",
      },
      ".no-scrollbar::-webkit-scrollbar": {
        display: "none" /* Chrome, Safari, Opera */,
      },

      ".no-scrollbar": {
        "-ms-overflow-style": "none" /* IE and Edge */,
        "scrollbar-width": "none" /* Firefox */,
      },
      ".scrollbar-luxe": {
        "&::-webkit-scrollbar": {
          width: "5px",
          height: "5px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#0e0e11",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(182, 160, 255, 0.2)",
          borderRadius: "10px",
          border: "1px solid rgba(72, 71, 75, 0.1)",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#b6a0ff",
        },
      },
    });
  },
];
