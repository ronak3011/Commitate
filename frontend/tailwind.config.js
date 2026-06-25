/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-color)',
        surface: 'var(--surface-color)',
        surfaceHover: 'var(--surface-hover)',
        border: 'var(--border-color)',
        primary: 'var(--primary)',
        primaryHover: 'var(--primary-hover)',
        tagBg: 'var(--tag-bg)',
        tagText: 'var(--tag-text)',
        textMain: 'var(--text-main)',
        textMuted: 'var(--text-muted)'
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '14px',
        'lg': '18px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '32px',
        '4xl': '32px',
        '5xl': '32px',
        '6xl': '32px',
        '7xl': '32px',
        '8xl': '32px',
        '9xl': '32px',
      },
      fontFamily: {
        sans: ['"Geist Sans"', 'sans-serif'],
        mono: ['"Geist Mono"', 'monospace'],
        pixel: ['"VT323"', 'monospace'],
        handwriting: ['"Handlee"', 'cursive'],
      }
    },
  },
  plugins: [],
}
