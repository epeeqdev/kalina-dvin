import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'dark-grey': '#6f6f6f',
        'white': '#FFFFFF',
        'secondary': '#2D2A26',
        'primary': '#E1251B'
      },
      fontFamily: {
        body: 'Montserrat arm'
      },
      screens: {
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1280px',
      },
      fontSize: {
        small: '6px',
        medium: '8px'
      }
    },
  },
  plugins: [],
}
export default config
