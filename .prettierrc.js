// @ts-nocheck

/** @type {import("prettier").Config} */
export default {
  bracketSpacing: true,
  singleQuote: false, // 使用双引号
  jsxSingleQuote: false, // JSX和TSX中也使用双引号
  arrowParens: "avoid",
  trailingComma: "none",
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  parser: "typescript", // 确保TypeScript/TSX文件被正确解析
};
