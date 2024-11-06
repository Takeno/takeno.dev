import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import astroConfig from 'eslint-plugin-astro';

export default [
  prettierConfig,
  prettierPlugin,
  ...astroConfig.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
    ignores: ['dist/**', 'node_modules/**', '.astro/**'],
  },
];
