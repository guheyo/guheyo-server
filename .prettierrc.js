module.exports = {
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  useTabs: false,
  tabWidth: 2,
  printWidth: 100,
  trailingComma: 'all',
  bracketSpacing: true,
  endOfLine: 'lf',
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
  ],
}
