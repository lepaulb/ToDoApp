module.exports = {
    root: true,
    extends: [
      '@edwmurph/eslint-config/vue',
      // uncomment this if you are building a chrome extension
      // '@edwmurph/eslint-config/webextensions'
    ],
    rules: {
      'vue/no-multiple-template-root': 0
    } 
  };