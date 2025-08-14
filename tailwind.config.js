module.exports = {
  content: [
    "./views/*.ejs",
    "./views/**/*.ejs",
    "./node_modules/tw-elements/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tw-elements/plugin.cjs"),
  ],
  darkMode: "class"
  
}