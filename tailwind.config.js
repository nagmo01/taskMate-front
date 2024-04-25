/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'original': "#333",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes:["wireframe"],
  },
}

