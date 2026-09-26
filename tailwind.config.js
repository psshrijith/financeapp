/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        finance: {
          primary: '#1E56A0',
          card: '#162447',
          income: '#10B981',
          incomeBg: '#E6F4EA',
          expense: '#EF4444',
          expenseBg: '#FCE8E6',
          darkBg: '#0F172A',
          cardDark: '#1E293B',
        },
      },
    },
  },
  plugins: [],
};
