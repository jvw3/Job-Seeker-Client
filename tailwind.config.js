module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f8fafc",
          secondary: "#1d4ed8",
          accent: "#37cdbe",
          neutral: "#3d4451",
        },
      },
      {
        othertheme: {
          primary: "#1d4ed8",
          secondary: "#f8fafc",
          accent: "#37cdbe",
          neutral: "#3d4451",
        },
      },
    ],
  },
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
        "5.5/12": "45%",
        "5.75/12": "47.5%"
      },
      height: {
        89: "89vh",
        75: "75vh",
        40: "40vh",
        80: "80vh"
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        quicksand: ["Quicksand, sans-serif"],
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
