/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html","./details.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'blue': '#1da5fc',
      'purple': '#5a4af4',
      'pink': '#b66dff',
      'orange': '#ffad4a',
      'green': '#07ce91',
      'red': '#ff6161',
      'dare-blue': '#121829',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}

