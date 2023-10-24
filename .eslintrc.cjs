module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: ["airbnb-base", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "linebreak-style": 0,
    "no-console": 0,
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "import/prefer-default-export": "off"
  },
  "settings": {
    "import/resolver": {
      "alias": {
        "map": [
          ["#app", "./app.js"],
          ["#util", "./misc/util.js"],
          ["#constant", "./misc/constant.js"],
          ["#routes", "./routes"],
          ["#models", "./models"],
          ["#middleware", "./middleware"],
          ["#controller", "./controller"],
          ["#services", "./services"],
          ["#error", "./error"],
          ["#misc", "./misc"],          
          ["#mockDB", "./misc/mockDB"]
        ],
        "extensions": [".js"]
      }
    }
  }
};
