# CRA 开发环境搭建

- [1.typescript 别名支持](#1typescript-别名支持)

## 1.typescript 别名支持

目前 CRA 不支持配置别名，但是有一个折中方案：

将 `tsconfig.json` 中添加配置项 `baseUrl: '.'`， 然后重新 `npm start`，使用 `import 'src/...'` 这样的写法。
