/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-grey': '#1A1A1A',
        'mac-card': '#242424',
        'mac-border': '#333333',
        'grey-white': '#EDEDED',
        'terminal-green': '#00CB00',
        'terminal-yellow': '#FFD000',
        'mac-red': '#FF5F56',
        'mac-yellow': '#FFBD2E',
        'mac-green': '#27C93F',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        stylish: ['Syne', 'Space Grotesk', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
      },
      boxShadow: {
        'mac-window': '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'mac-dock': '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.15)',
      }
    },
  },
  plugins: [],
}
