// https://qiita.com/mysticatea/items/cc40251136ce167a010b#eslintrccjs-%E3%82%92%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88
// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  // https://chaika.hatenablog.com/entry/2020/12/04/083000
  rules: { "react/react-in-jsx-scope": "off" },
  settings: {
    react: {
      version: "detect",
    },
  },
};
