module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // general
    'eslint:recommended',

    // .vue
    'plugin:vue/essential',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',

    // .ts
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    // "plugin:prettier/recommended", // unnecessary, supplied by previous plugins
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': ['warn'],
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
