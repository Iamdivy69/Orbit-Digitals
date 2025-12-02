/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // MERGED: The Anatomy Fonts
        sans: ["var(--font-inter)", "sans-serif"],
        hero: ["var(--font-hero)", "sans-serif"],
        heading: ["var(--font-heading)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
      },
      // MERGED: All Animations (Gradient + Text)
      animation: {
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        "text-wave": "text-wave 10s linear infinite",
        "hero-float": "hero-float 6s ease-in-out infinite",
        "hero-glow": "hero-glow 4s ease-in-out infinite alternate",
      },
      keyframes: {
        moveHorizontal: {
          "0%": { transform: "translateX(-50%) translateY(-10%)" },
          "50%": { transform: "translateX(50%) translateY(10%)" },
          "100%": { transform: "translateX(-50%) translateY(-10%)" },
        },
        moveVertical: {
          "0%": { transform: "translateY(-50%)" },
          "50%": { transform: "translateY(50%)" },
          "100%": { transform: "translateY(-50%)" },
        },
        moveInCircle: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        textWave: {
            "0%": { backgroundPosition: "0% 50%" },
            "100%": { backgroundPosition: "-200% 50%" }
        },
        heroFloat: {
            "0%, 100%": { transform: "translate3d(0, 0, 0)" },
            "50%": { transform: "translate3d(0, -10px, 0)" }
        },
        heroGlow: {
            "0%": { filter: "drop-shadow(0 0 5px rgba(60, 183, 255, 0.3))" },
            "100%": { filter: "drop-shadow(0 0 15px rgba(76, 76, 76, 0.6))" }
        },
      },
    },
  },
  plugins: [],
};