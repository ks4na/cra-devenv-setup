# CRA 开发环境搭建

- [1.typescript 别名支持](#1typescript-别名支持)
- [2.react-router-dom(Ver 6)](#2react-router-domver-6)
  - [安装 react-router-dom](#安装-react-router-dom)
  - [创建路由配置文件 `src/router.tsx`](#创建路由配置文件-srcroutertsx)
  - [在 src/index.tsx 中引入路由配置](#在-srcindextsx-中引入路由配置)
  - [更改根组件 src/App.tsx 的代码查看效果](#更改根组件-srcapptsx-的代码查看效果)
- [3.css 样式重置（normalize）](#3css-样式重置normalize)
- [4.sass 样式文件支持](#4sass-样式文件支持)
- [5.引用 public 目录下的资源](#5引用-public-目录下的资源)
  - [html 中引用 public 目录下的资源](#html-中引用-public-目录下的资源)
  - [css 等样式文件中引用 public 目录下的资源](#css-等样式文件中引用-public-目录下的资源)
  - [js 代码中引用 public 目录下的资源](#js-代码中引用-public-目录下的资源)
- [6.更改页面 head 中的标签值](#6更改页面-head-中的标签值)
  - [安装](#安装)
  - [配置 HelmetProvider](#配置-helmetprovider)
  - [在页面中修改 head 中标签的信息](#在页面中修改-head-中标签的信息)
- [7.添加.gitattributes](#7添加gitattributes)
- [8.启用 corepack 管理包管理器](#8启用-corepack-管理包管理器)
- [9.配置 .nvmrc 指定 node 版本](#9配置-nvmrc-指定-node-版本)
- [9.配置 linters](#9配置-linters)
  - [配置 eslint](#配置-eslint)
  - [配置 stylelint](#配置-stylelint)
  - [配置 prettier](#配置-prettier)

## 1.typescript 别名支持

目前 CRA 不支持配置别名，但是有一个折中方案：

将 `tsconfig.json` 中添加配置项 `baseUrl: '.'`， 然后重新 `npm start`，使用 `import 'src/...'` 这样的写法。

## 2.react-router-dom(Ver 6)

### 安装 react-router-dom

```sh
npm i react-router-dom@6
```

### 创建路由配置文件 `src/router.tsx`

示例如下：

```tsx
import { createBrowserRouter } from 'react-router-dom'
import App from 'src/App'
import IndexPage from 'src/pages/IndexPage'
import DogsPage from 'src/pages/Dogs'
import CatsPage from 'src/pages/Cats'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      // 嵌套路由，用 children 指定
      children: [
        {
          path: '/',
          element: <IndexPage />,
        },
        {
          path: 'dogs',
          element: <DogsPage />,
        },
        {
          path: 'cats',
          element: <CatsPage />,
        },
      ],
    },
    // 404 组件
    {
      path: '*',
      element: <h2>Page Not Found</h2>,
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
)
```

### 在 src/index.tsx 中引入路由配置

移除 `<App />` 组件，使用 `<RouterProvider>` 组件：

```tsx
// ......

import { RouterProvider } from 'react-router-dom'
import { router } from 'src/router'

// ......

root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
)
```

### 更改根组件 src/App.tsx 的代码查看效果

使用 `<Outlet />` 组件用于决定子路由组件在这里渲染：

```tsx
import './App.css'
import { NavLink, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <div className="AppNavBar">
        <NavLink to="/">index</NavLink>
        <NavLink to="/dogs">dogs</NavLink>
        <NavLink to="/cats">cats</NavLink>
      </div>
      {/* 子路由对应的组件在 <Outlet /> 处渲染 */}
      <Outlet />
    </div>
  )
}

export default App
```

## 3.css 样式重置（normalize）

根据 CRA 官网文档，直接在 `index.css` 最上方加入以下代码即可：

```css
/* css 样式重置 */
@import-normalize;
```

## 4.sass 样式文件支持

根据 CRA 官网文档，使用 `npm i sass` 安装依赖后，将 `css` 文件后缀名改为 `scss` 即可。

如果想要使用 `module` 化的 `scss` 文件，即想要使用 `import styles from 'xxx.scss'` 的方式来引入样式，需要使用 `.module.scss` 后缀名。

## 5.引用 public 目录下的资源

如果把文件放到根目录的 `public` 目录下，这些内容将会被直接复制到打包后的 `build` 目录中。想要引用放在 `public` 目录中的资源，需要使用 `PUBLIC_URL` 这个环境变量。

> `PUBLIC_URL` 用于指定打包后的产物放置的目录位置，放在二级路由或者 CDN 上时需要指定该属性。可以参照[官网文档-进阶配置](https://create-react-app.dev/docs/advanced-configuration)在 `.env` 等环境变量配置文件中指定 `PUBLIC_URL`。（该文档中 `PUBLIC_URL` 的使用说明中还包含了 `package.json -> homepage` 字段与 `PUBLIC_URL` 环境变量的区别）

> 注意： 通常情况下，项目部署在服务器二级路径下时，`process.env.PUBLIC_URL` 会指定为类似 `/a/b/c` 这样的二级路径，此时 `BrowserRouter` 的 `basename` 与 `PUBLIC_URL` 是同样的，所以可以指定 `basename: process.env.PUBLIC_URL` 。但是如果 `PUBLIC_URL` 指定的是类似 `http://example.com/a/b/c` 这样的带 hostname 的路径时， `BrowserRouter` 的 `basename` 不能直接指定为 `process.env.PUBLIC_URL`。

> 本质上 `BrowserRouter` 的 `basename` 与 `PUBLIC_URL` 是无关的，`basename` 指定的是路由前缀，而 `PUBLIC_URL` 决定静态资源的位置。可以将静态资源放在 CDN 上用 `https://...` 的方式引用，将自己的二级域名转发到 CDN 上的 `index.html`，这种情况 `basename` 与 `PUBLIC_URL` 就是不一样的。只是通常情况下，项目部署在服务器上二级目录且不使用 CDN，此时 `BrowserRouter` 的 `basename` 与 `PUBLIC_URL` 是同样的。

### html 中引用 public 目录下的资源

在 html 中引用环境变量使用 `%ENV_VARIABLES%` 的方式。  
所以使用 `%PUBLIC_URL%` 变量访问 `public` 目录中的资源，参考 `public/index.html` 第 12 行：

```html
<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
```

### css 等样式文件中引用 public 目录下的资源

在 css/scss 等样式文件中只需要使用相对路径（如：`../public/1.png`）的方式进行引用即可，webpack 打包时会自动补充 `PUBLIC_URL` 且打包为带有 hash 的文件名。

```css
.Logo {
  background-image: url(./public/logo.png);
}
```

### js 代码中引用 public 目录下的资源

在 js 代码中需要使用 `process.env.PUBLIC_URL` 变量来引用 public 目录下的资源：

> CRA 不允许使用 `import` 方式引入 `src` 目录外的图片。另外如果使用 `import` 方式引入图片，将会打包出带有 hash 的文件名。

```tsx
render() {
  return <img src={process.env.PUBLIC_URL + '/img/logo.png'} />
}
```

`BrowserRouter` 设置 basename (通常情况下是与 `PUBLIC_URL` 一致的，参见 “5. 引用 public 目录下的资源” 章节)：

```tsx
<BrowserRouter basename={process.env.PUBLIC_URL} />
```

## 6.更改页面 head 中的标签值

修改 `title` 、`favicon` 等信息时，需要对页面 `<head>` 中的元素进行修改，可以使用 `react-helmet-async` 库来实现。

### 安装

```sh
npm i react-helmet-async
```

### 配置 HelmetProvider

修改 `src/index.tsx`，使用 `HelmetProvider` 组件包裹根组件：

```tsx
// ......
import { HelmetProvider } from 'react-helmet-async'

// ......

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
)
```

### 在页面中修改 head 中标签的信息

下面的例子修改了 `<head>` 中的 `<title> ` 和 `link:favicon` 的值：

```tsx
render() {
  return (
    <>
      <Helmet>
        <title>cra devenv setup</title>
        <link
          rel="shortcut icon"
          href={`${publicUrl}/favicon-dark.png`}
          type="image/x-icon"
        />
      </Helmet>
      {/* ...... */}
    </>
  )
}
```

注意： 由于 `public/index.html` 中已经指定了 `favicon`，需要给该标签加上 `data-rh="true"`，否则更新 `link:favicon` 标签的值将没有效果。

```html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" data-rh="true" />
```

## 7.添加.gitattributes

见笔记 [.gitattributes 介绍](https://gitbook.yumecoder.top/above-coding/%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6%E7%9B%B8%E5%85%B3/git%E9%AB%98%E7%BA%A7/gitattributes%E4%BB%8B%E7%BB%8D.html)

## 8.启用 corepack 管理包管理器

见笔记 [corepack 管理包管理器](https://gitbook.yumecoder.top/above-coding/%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E7%9B%B8%E5%85%B3/corepack%E7%AE%A1%E7%90%86%E5%8C%85%E7%AE%A1%E7%90%86%E5%99%A8.html)

## 9.配置 .nvmrc 指定 node 版本

> 1. 前提是使用 `nvm` 来管理 `node` 版本。
> 2. 这个方式并不能强制团队使用同一个 node 版本，最好还是使用 `devcontainer` 的方式来保证项目开发环境的一致性。

根目录添加 `.nvmrc` 文件，其中包含 `node` 的版本，可以指导团队合作时使用相同版本的 `node`。  
使用 `nvm` 的 `nvm use`、`nvm install`、`nvm which` 等命令时会使用该文件指定的 `node` 版本。

示例：

```sh
# 将当前使用的 node 版本加入 .nvmrc 文件
node -v > .nvmrc
```

之后拉取项目后，直接使用 `nvm install` 命令即可安装 `.nvmrc` 中指定版本的 `node`。

## 9.配置 linters

### 配置 eslint

CRA 已经默认配置了 `eslint`，见 [官网文档](https://create-react-app.dev/docs/setting-up-your-editor/#extending-or-replacing-the-default-eslint-config)。  
如果需要自定义添加规则或者拓展配置，可以在 `package.json` 中 `eslintConfig` 字段设置。

另外也可以自己自定义配置 `eslint`。官方强烈建议拓展官方的基础配置，即继承 `package.json` 中 `eslintConfig` 配置。

**自定义配置 eslint**

> CRA 已经默认安装了 `eslint`，无需手动安装。

首先在根目录创建配置文件 `.eslintrc.js` ，将 `package.json` 中的 `eslintConfig` 配置复制过来：

```js
module.exports = {
  extends: ['react-app', 'react-app/jest'],
}
```

然后就可以直接参照 eslint 官方文档在 `.eslintrc.js` 配置文件中进行配置了。例如添加一些规则：

```js
module.exports = {
  extends: ['react-app', 'react-app/jest'],
  rules: {
    'no-alert': 'warn',
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'], // rules only targets typescript files
      rules: {
        'no-alert': 'error',
      },
    },
  ],
}
```

如果使用 `prettier`， 还需要拓展 `eslint-config-prettier` 来关闭一些可能与 `prettier` 冲突的规则。  
首先安装 `eslint-config-prettier`：

```sh
npm install --save-dev eslint-config-prettier
```

然后在 `.eslintrc.js` 中 `extends` 数组的最后加上 `prettier` （必须放在最后一项）：

```js
module.exports = {
  extends: ['react-app', 'react-app/jest', 'prettier'],
  // ...
}
```

### 配置 stylelint

首先安装 `stylelint`，并安装标准配置 `stylelint-config-standard`：

```sh
npm install --save-dev stylelint stylelint-config-standard
```

然后在根目录创建 `.stylelintrc.js` 文件：

```js
module.exports = {
  extends: 'stylelint-config-standard',
}
```

如果使用 `prettier` ，还需要安装并配置 `stylelint-config-prettier` 来关闭一些可能会与 `prettier` 冲突的规则：

```sh
npm install --save-dev stylelint-config-prettier
```

```js
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
}
```

> 使用 SCSS 时，需要将上面的标准配置 `stylelint-config-standard` 替换成 `stylelint-config-standard-scss` ，然后将 `stylelint-config-prettier` 替换成 `stylelint-config-prettier-scss`。

> vscode 的 `stylelint` 插件默认不对 scss 文件做检查，需要在配置中 `stylelint.validate` 中加上 `scss`。

### 配置 prettier

首先安装 `prettier`：

```sh
npm install --save-dev --save-exact prettier
```

然后创建配置文件 `.prettierrc.js`：

```js
module.exports = {
  endOfLine: 'lf', // v1.15.0 后可用，v2.0.0 后由 auto 改为 lf
  semi: false, // 默认为 true
  singleQuote: true, // 默认为 false
}
```
