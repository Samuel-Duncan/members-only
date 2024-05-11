import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
    rules: {
      'prefer-const': 'error', // This setting enforces the use of const whenever possible
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];
