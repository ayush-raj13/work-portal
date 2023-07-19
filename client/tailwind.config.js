/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'barlow': ['"Barlow"','sans'],
        'barlow-condensed': ['"Barlow Condensed"','sans'],
        'bellefair': ['"Bellefair"','sans'],
      },
      boxShadow: {
        '3xl': '0 0 0 35px rgba(162, 181, 187, 0.2)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
