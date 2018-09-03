module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "mocha": true
  },
  "extends": "airbnb",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    },
  },
  "rules" : {
    "prefer-const": 1,
    "no-plusplus": 0,
    "import/prefer-default-export": 0,
    "complexity": [ 1, 10 ],
    "react/require-default-props": 0,
    "react/forbid-prop-types": 0,
    "react/prefer-es6-class": 0,
    "react/prefer-stateless-function": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-curly-spacing": [ 2, "always" ],
  }
}