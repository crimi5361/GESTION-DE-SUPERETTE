/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    fontFamily: {
      futuristic: ['Orbitron', 'sans-serif']
    },
    colors: {
      primary: '#B56910',
    }
  },
};
export const plugins = [];
  