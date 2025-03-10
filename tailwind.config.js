/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#1E3A8A",
          secondary: "#9333EA",
          accent: "#22C55E",
        },
      },
    },
    plugins: [],
  };
  