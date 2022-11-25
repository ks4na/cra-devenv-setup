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

> `PUBLIC_URL` 用于指定打包后的产物放置的目录位置，放在二级路由或者 CDN 上时需要指定该属性。另外需要在 `BrowserRouter` 组件中指定 `basename: process.env.PUBLIC_URL`，`Link` 等路由组件的链接路径才是正确的。

### html 中引用 public 目录下的资源

在 html 中引用环境变量使用 `%ENV_VARIABLES%` 的方式。  
所以使用 `%PUBLIC_URL%` 变量访问 `public` 目录中的资源，参考 `public/index.html` 第 12 行：

```html
<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
```

### css 等样式文件中引用 public 目录下的资源

在 css/scss 等样式文件中只需要使用相对路径（如：`../public/1.png`）的方式进行引用即可，webpack 打包时会自动打包为带有 hash 的文件名。

```css
.Logo {
  background-image: url(./public/logo.png);
}
```

### js 代码中引用 public 目录下的资源

在 js 代码中需要使用 `process.env.PUBLIC_URL` 变量来引用 public 目录下的资源：

```tsx
render() {
  return <img src={process.env.PUBLIC_URL + '/img/logo.png'} />
}
```

`BrowserRouter` 设置 basename：

```tsx
<BrowserRouter basename={process.env.PUBLIC_URL} />
```
