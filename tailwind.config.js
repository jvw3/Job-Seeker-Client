module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"), require("daisyui")],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      width: {
        "9/10": "20rem",
      },
      colors: {
        "seeker-blue": "#1d4ed8",
        "seeker-gray": "#e2e8f0",
        "home-blue": "#0b0b41",
        "home-orange": "#8e4318",
        "google-gray": "#1A1C20",
      },
      backgroundImage: {
        pinkswirl:
          "url('../src/components/views/HompageImages/richard-horvath-_nWaeTF6qo0-unsplash.jpg')",
        home: "url('../src/components/views/HompageImages/purpleyblueimage.jpg')",
        notfound: "url('../src/components/views/HompageImages/6373669.jpg')",
      },
    },
  },
};
