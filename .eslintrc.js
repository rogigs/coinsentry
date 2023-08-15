module.exports = {
  root: true,
  extends: ['airbnb', 'prettier'],
  parser: '@babel/eslint-parser',
  plugins: ['react', 'prettier', 'eslint-plugin-only-warn'],
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
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', 'jsx'],
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
