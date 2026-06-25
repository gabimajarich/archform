/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper:    "#FBFAF7",   // app background (warm white)
        surface:  "#FFFFFF",   // cards
        sand:     "#E9E2D4",   // primary accent / borders
        clay:     "#C9BBA4",   // deeper accent
        stone:    "#8B8275",   // muted text / icon lines
        ink:      "#2B2A27",   // primary text (near-black, warm)
        umber:    "#6B5E4C",   // headings / emphasis
        moss:     "#6E7A5E",   // subtle positive accent
        warn:     "#A8703E",   // warning accent (earthy amber, not red)
        warnbg:   "#F5ECE0",   // warning card background
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
