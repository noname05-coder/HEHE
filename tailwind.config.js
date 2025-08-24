/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          50: '#fff4ed',
          100: '#ffe6d5',
          200: '#feccaa',
          300: '#fdaa74',
          400: '#fb7c3c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
      fontFamily: {
        graffiti: ['Permanent Marker', 'cursive'],
        manga: ['Fredericka the Great', 'cursive'],
      },
      backgroundImage: {
        'graffiti-texture': "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><defs><filter id=\"noise\"><feTurbulence baseFrequency=\"0.9\" numOctaves=\"4\" result=\"noise\"/><feColorMatrix in=\"noise\" type=\"saturate\" values=\"0\"/></filter></defs><rect width=\"100%\" height=\"100%\" filter=\"url(%23noise)\" opacity=\"0.1\"/></svg>')",
        'paper-texture': "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\" viewBox=\"0 0 200 200\"><defs><filter id=\"paper\"><feTurbulence baseFrequency=\"0.04\" numOctaves=\"5\" result=\"noise\"/><feColorMatrix in=\"noise\" type=\"saturate\" values=\"0\"/></filter></defs><rect width=\"100%\" height=\"100%\" fill=\"%23f5f5f5\" filter=\"url(%23paper)\" opacity=\"0.8\"/></svg>')",
      },
      animation: {
        'spray-in': 'sprayIn 0.6s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'confetti': 'confetti 3s ease-out infinite',
      },
      keyframes: {
        sprayIn: {
          '0%': { opacity: '0', transform: 'scale(0.8) rotate(-5deg)', filter: 'blur(2px)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)', filter: 'blur(0px)' }
        },
        glowPulse: {
          '0%, 100%': { textShadow: '0 0 20px currentColor, 0 0 40px currentColor' },
          '50%': { textShadow: '0 0 30px currentColor, 0 0 60px currentColor' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        confetti: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}
