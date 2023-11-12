import type {Config} from 'tailwindcss'

const config: Config = {
        content: [
            './pages/**/*.{js,ts,jsx,tsx,mdx}',
            './components/**/*.{js,ts,jsx,tsx,mdx}',
            './app/**/*.{js,ts,jsx,tsx,mdx}',
        ],
        theme: {
            extend: {
                colors: {
                    primary: {
                        DEFAULT: '#2D2A26', // Original secondary color
                        lighter: '#484542', // Lighter shade for hover or focus states
                        darker: '#1C1B19',  // Darker shade for active or pressed states
                    },
                    secondary: {
                        DEFAULT: '#E1251B', // Original primary color
                        lighter: '#E54B45', // Lighter shade for hover or focus states
                        darker: '#A71D15',  // Darker shade for active or pressed states
                    },
                    gray: {
                        DEFAULT: '#e8e8e8', // The main gray color
                        lighter: '#f2f2f2', // A lighter variant (optional)
                        darker: '#bcbcbc',  // A darker variant (optional)
                    },
                    white: {
                        DEFAULT: '#ffffff', // The white color
                        darker: '#bcbcbc',  // A darker variant (optional)
                    },
                },
                fontSize: {
                    '2xs': '0.625rem',     // 10px
                    xs: '0.75rem',     // 12px
                    sm: '0.875rem',    // 14px
                    base: '1rem',      // 16px, recommended for body text
                    lg: '1.125rem',    // 18px
                    xl: '1.25rem',     // 20px
                    '2xl': '1.5rem',   // 24px
                    '3xl': '1.875rem', // 30px
                    '4xl': '2.5rem',  // 40px
                    '5xl': '3rem',     // 48px
                    '6xl': '3.5rem',     // 56px
                    '7xl': '4rem',     // 64px
                    '8xl': '4.5rem',     // 72px
                },
            },
        },
    plugins: [],
    }
export default config