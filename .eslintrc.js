module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  extends: ['react-app'],
  rules: {
    // custom rules here
    '@typescript-eslint/no-angle-bracket-type-assertion': 0,
    'react-hooks/exhaustive-deps': 0,
  },
}
