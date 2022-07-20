module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    camelcase: process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-useless-return': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'array-callback-return': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-expressions': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-array-constructor': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    eqeqeq: process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-useless-escape': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
