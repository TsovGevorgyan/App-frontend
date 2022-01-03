module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true,
  },

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  extends: [
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, endOfLine: 'auto' }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 0,
    'react/no-unescaped-entities': 0,
    'no-prototype-builtins': 0,
    'no-console': 'off',
    'react/no-find-dom-node': 0,
    'no-unused-vars': 0,
    'react/display-name': 0,
    'react/jsx-no-duplicate-props': 0,
    'no-dupe-keys': 0,
    'react/jsx-key': 0,
    'no-case-declarations': 0,
    'react/jsx-no-target-blank': 0,
    'no-inner-declarations': 0,
    'react/react-in-jsx-scope': 0,
    'no-empty': 0,
    'react/no-children-prop': 0,
    'no-debugger':
      process.env.REACT_APP_DEVELOPMENT_MODE === 'production' ? 'error' : 'off',
    'linebreak-style': 0,
    'no-useless-escape': 0,
  },

  parser: 'babel-eslint',
};
