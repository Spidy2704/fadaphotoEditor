module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Work Sans", "sans-serif"],
      },
      colors: {
        primary: "#EE9CA6",
        primary2:"#EE9CA6"
   
      },
      boxShadow: {
        "3xl": "0px 8px 25px rgba(0, 0, 0, 0.07)",
        "4xl": "0px 8px 25px rgba(0, 0, 0, 0.04);",

      },
    },
  },
  variants: {
    scale: ["responsive", "hover", "focus", "group-hover"],
    textColor: ["responsive", "hover", "focus", "group-hover"],
    opacity: ["responsive", "hover", "focus", "group-hover"],
    backgroundColor: ["responsive", "hover", "focus", "group-hover"],
    display: ["responsive", "group-hover", "group-focus"],
    extend: {
      margin: ["last"],
      backgroundColor: ["odd"],
    },
  },
  plugins: [
    // ...
    require('tailwind-scrollbar'),
],
};
