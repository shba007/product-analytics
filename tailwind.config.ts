/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'components/**/*.{vue,js,ts}',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'composables/**/*.{js,ts}',
    'plugins/**/*.{js,ts}',
    'App.{js,ts,vue}',
    'app.{js,ts,vue}',
    'Error.{js,ts,vue}',
    'error.{js,ts,vue}',
    'content/**/*.md'
  ],
  theme: {
    fontSize: {
      '2xs': ['0.5rem', '0.5625rem'],
      xs: ['0.625rem', '0.75rem'],
      sm: ['0.75rem', '0.875rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.25rem', '1.5625rem'],
      xl: ['1.5rem', '1.875rem'],
      '2xl': ['2rem', '2.5rem'],
      '3xl': ['2.5rem', '3.125rem'],
    },
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      light: {},
      black: '#000000',
      dark: {
        400: '#0E0E11',
        500: '#151A1F',
        600: '#22262E',
      },
      primary: {
        500: '#3259E8',
      },
      success: {
        400: '#4ADE80',
        500: '#22C55E',
        600: '#15803D',
      },
      warning: {
        400: '#FACC15',
        500: '#EAB308',
        600: '#CA8A04',
      },
      alert: {
        400: '#E11D48',
        500: '#BE123C',
        600: '#9F1239',
      },
    },
    extend: {}
  },
  plugins: [],
}

