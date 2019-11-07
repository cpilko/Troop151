module.exports = {

  parserOptions: {
    sourceType: 'module',
  },

  env: {
    node: true,
  },

  overrides: [
    {
      files: ['test/*.ts'],
      rules: {
        'max-lines': [2, 999],
        'max-lines-per-function': [2, 899],
        'max-statements': [2, 99],
      },
      env: {
        mocha: true,
      },
    },
    {
      files: ['proto.ts'],
      env: {
        browser: true,
      },
    },
  ],
}
