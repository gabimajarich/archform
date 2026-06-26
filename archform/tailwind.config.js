/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper:    "#FFFDF8",   // near-white (palette col 1)
        surface:  "#FFFEFE",   // cards — just off pure white
        sand:     "#EBD9CD",   // light linen (palette col 2)
        clay:     "#D8BFB0",   // medium beige (palette col 3)
        stone:    "#9C7E6A",   // muted text — warm mid-brown
        ink:      "#2E2420",   // primary text — near-black, warm
        umber:    "#C0927E",   // headings / emphasis (palette col 5)
        moss:     "#8F7A6A",   // subtle neutral accent
        warn:     "#B07848",   // warning accent — earthy amber
        warnbg:   "#F5EBE0",   // warning card background
      },
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        display: ["'Fraunces'", "Georgia", "serif"],
      },
      letterSpacing: { tightish: "-0.02em", wide2: "0.12em" },
      boxShadow: {
        card:  "0 1px 2px rgba(43,42,39,0.04), 0 8px 24px rgba(43,42,39,0.05)",
        lift:  "0 4px 12px rgba(43,42,39,0.08), 0 18px 40px rgba(43,42,39,0.08)",
      },
      transitionTimingFunction: { soft: "cubic-bezier(0.22, 1, 0.36, 1)" },
    },
  },
  plugins: [],
};
