/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        light: {
          background: '#f0ebd8',
          card: '#ffffff',
          primary: '#1d2d44',
          secondary: '#3e5c76',
          accent: '#748cab',
          accentHover: '#3e5c76',
          border: '#dcd6c0'
        },
        dark: {
          background: '#0d1321',
          card: '#1d2d44',
          primary: '#f0ebd8',
          secondary: '#748cab',
          accent: '#3e5c76',
          accentHover: '#748cab',
          border: '#3e5c76'
        }
      }
    }
  },
  plugins: []
};
