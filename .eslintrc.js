const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  plugins: ['@typescript-eslint', 'prettier', 'check-file'],
  rules: {
    'prettier/prettier': ERROR,
    'import/prefer-default-export': OFF,
    'import/extensions': OFF,
    'no-nested-ternary': OFF,
    'no-ternary': OFF,
    'no-unneeded-ternary': WARNING,
    'no-param-reassign': [ERROR, { props: false }],
    'no-use-before-define': OFF,
    'no-unused-vars': OFF,
    'no-console': OFF,
    'class-methods-use-this': OFF,
    '@typescript-eslint/no-use-before-define': ERROR,
    '@typescript-eslint/no-unused-vars': [ERROR, { args: 'none' }],
    '@typescript-eslint/naming-convention': [
      ERROR,
      {
        selector: 'default',
        format: ['camelCase'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
      },
      {
        selector: 'objectLiteralProperty',
        format: null,
      },
    ],
    'check-file/filename-naming-convention': [
      ERROR,
      {
        '**/*.{jsx,tsx}': 'KEBAB_CASE',
        '**/*.{js,ts}': 'KEBAB_CASE',
      },
      {
        ignoreMiddleExtensions: true,
      },
    ],
    'check-file/folder-naming-convention': [
      ERROR,
      {
        '*/!(__tests__)/': 'KEBAB_CASE',
      },
    ],
  },
  ignorePatterns: ['.eslintrc.js'],
}
