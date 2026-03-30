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
        primary: {
          DEFAULT: '#4462F8',
          50: '#EEF1FE',
          100: '#DCE2FD',
          200: '#B9C5FB',
          300: '#96A8F9',
          400: '#738BF7',
          500: '#4462F8',
          600: '#0D32F2',
          700: '#0A26BD',
          800: '#071A88',
          900: '#040E53',
        },
        background: '#F1F5F9',
        dark: '#0A0F18',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'btn': '1rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
