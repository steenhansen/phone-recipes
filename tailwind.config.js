module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./stories/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'active-colour': 'rgba(0,158,115,0.19)',   /* bg-active-colour      Blueish Green */
        'delete-colour': 'rgba(213,94,0,0.99)',   /* text-delete-colour    Vermillion    */
        'cancel-colour': 'rgba(0,0,0,0.44)',   /* text-cancel-colour    Gray        */
        'row-colour': 'rgba(240,228,66,0.17)',   /* bg-row-colour    Yellow        */
        'row-input-colour': 'rgba(240,228,66,0.25)',   /* bg-row-input-colour    Yellow        */


        'row-input-colour-none': 'rgba(240,240,240,1)',   /* row-input-colour-none    gray        */
      },
    },
  },
  plugins: [],
}

