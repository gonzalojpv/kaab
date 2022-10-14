/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    extend: {
      colors: {
        'lime-green': '#95f3d3',
        magenta: '#ce27a8',
        'magenta-soft': '#ed6fd1'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
