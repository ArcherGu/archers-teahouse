/**
 * @type {import('eslint').Linter.Config}
 * @see https://eslint.org/docs/user-guide/configuring/
 */
const config = {
  extends: '@antfu',
  overrides: [
    {
      files: 'cypress/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      rules: {
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
}

module.exports = config
