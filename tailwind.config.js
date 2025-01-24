/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      approve: '#00ff00',
      reject: '#FF2C2C',
      transparent: 'transparent',
      black: '#00000080',
      darkBlue: '#344562',
      darkPrimary: '#000000',
      darkSecondary: '#373535',
      darkTertiary: '#96989A',
      darkDisabled: '#D2D3D4',
      textColour: '#2D2D2D',
      textHint: '#7C7C7C',
      primaryInputBg: '#EAEDF2',
      mainBg: '#F6F6F6',
      white: '#FEFEFE',
      dropDownBg: '#F0F0F0',
      lightPrimary: '#315CA3',
      lightSecondary: '#628BCE',
      lightTertiary: '#8192AE',
      lightDisabled: '#EAEDF2',
      primaryCardColour: '#EAEDF2',
      secondaryCardColour: '#F8FBFE',
      tertiaryCardColour: '#E1E3E9'
    },
    fontFamily: {
      sans: ['Arial', 'sans-serif'], // Add Arial as the default sans-serif font
    },
  },
  plugins: [],
}

