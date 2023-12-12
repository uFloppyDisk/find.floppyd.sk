/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": 'rgba(var(--color-primary-50), <alpha-value>)',
          "100": 'rgba(var(--color-primary-100), <alpha-value>)',
          "200": 'rgba(var(--color-primary-200), <alpha-value>)',
          "300": 'rgba(var(--color-primary-300), <alpha-value>)',
          "400": 'rgba(var(--color-primary-400), <alpha-value>)',
          "500": 'rgba(var(--color-primary-500), <alpha-value>)',
          "600": 'rgba(var(--color-primary-600), <alpha-value>)',
          "700": 'rgba(var(--color-primary-700), <alpha-value>)',
          "800": 'rgba(var(--color-primary-800), <alpha-value>)',
          "900": 'rgba(var(--color-primary-900), <alpha-value>)',
          "950": 'rgba(var(--color-primary-950), <alpha-value>)',
        }
      },
    },
  },
  plugins: [],
};
