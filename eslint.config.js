import prettierConfig from 'eslint-config-prettier';

export default [
  prettierConfig,
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
];
