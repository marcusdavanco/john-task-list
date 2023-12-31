/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        primary: {
          100: '#54547C', 
          200: '#43436C',
          300: '#31315B',
          400:  '#22224A',
          500:  '#16163E'
        },
        secondary: {
          100: '#69A2D8',
          200: '#508BC2',
          300: '#3D79B1',
          400: '#2967A0',
          500: '#20609B',
        },
        gray: {
          100: '#E7E7E7',
          200: '#EDEDED',
          300: '#DEDEDE',
          400: '#CCCCCC',
          500: '#B3B3B3',
          600: '#9C9C9C',
          700: '#707070',
          800: '#595959',
          900: '#404040',
        }
      },
      backgroundImage: {
        checkmark: `url("data:image/svg+xml,%3Csvg width='10' height='7' viewBox='0 0 10 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.43059 0.342154L4.09865 4.67409L1.61618 2.19162L0.780273 3.02753L4.09865 6.3459L9.26649 1.17806L8.43059 0.342154Z' fill='%23F2F2F2'/%3E%3C/svg%3E%0A")`,
      },      
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}
