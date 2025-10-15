import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#a2122a",
        secondary: "#354a80",
        background: "#0a0a0a",
        foreground: "#ffffff",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      keyframes: {
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        gradientFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        neonPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 8px #a2122a, 0 0 18px rgba(162, 18, 42, 0.5)' 
          },
          '50%': { 
            boxShadow: '0 0 16px #a2122a, 0 0 30px rgba(162, 18, 42, 0.7)' 
          },
        },
        float: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'gradient-shift': 'gradientShift 4s ease infinite',
        'gradient-flow': 'gradientFlow 24s ease-in-out infinite',
        'neon-pulse': 'neonPulse 1.8s ease-in-out infinite',
        'float': 'float 14s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;

