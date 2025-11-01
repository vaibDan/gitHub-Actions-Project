const { defineConfig } = require('eslint/config');
const globals = require('globals');

/*
 * CommonJS ESLint configuration.
 * Using a .cjs file avoids parser errors about `import`/`export` when tools
 * interpret config files as CommonJS. This config keeps the stricter rules
 * previously added but in a format that will not cause the "sourceType" parse error.
 */

module.exports = defineConfig([
  {
    files: ['**/*.{js,cjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module', // allow project files to use ESM when appropriate
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'no-unused-vars': 'error',
      'no-console': ['warn', { allow: ['error', 'warn', 'info'] }],
      'no-var': 'error',
      'prefer-const': 'error',
      'eol-last': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-blocks': ['error', 'always'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-infix-ops': 'error',
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    },
  },
]);
