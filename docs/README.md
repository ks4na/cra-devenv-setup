# CRA 开发环境搭建

- [1.typescript 别名支持](#1typescript-别名支持)
- [2.react-router-dom(Ver 6)](#2react-router-domver-6)
  - [安装 react-router-dom](#安装-react-router-dom)
  - [创建路由配置文件 `src/router.tsx`](#创建路由配置文件-srcroutertsx)
  - [在 src/index.tsx 中引入路由配置](#在-srcindextsx-中引入路由配置)
  - [更改根组件 src/App.tsx 的代码查看效果](#更改根组件-srcapptsx-的代码查看效果)

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

export const router = createBrowserRouter([
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
])
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
