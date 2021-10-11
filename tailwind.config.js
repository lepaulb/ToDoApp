module.exports = {
  mode: 'jit',
  purge: [
    './*.html',
    './src/**/*.vue',
    './src/*.{js,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // disabling Tailwind Preflight https://tailwindcss.com/docs/preflight
  } 
}
