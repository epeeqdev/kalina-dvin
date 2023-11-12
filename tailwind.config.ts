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
            },
        },
    plugins: [],
    }
export default config