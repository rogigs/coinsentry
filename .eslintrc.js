module.exports = {
  root: true,
  extends: ['airbnb', 'prettier', 'next/core-web-vitals'],
  parser: '@babel/eslint-parser',
  plugins: [
    'react',
    'prettier',
    'eslint-plugin-only-warn',
    'simple-import-sort',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      parserOpts: {
        plugins: ['jsx'],
      },
    },
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', 'jsx', '.ts', '.tsx'],
      },
    ],
    'prettier/prettier': 'error',
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['src'],
      },
    },
  },
};
