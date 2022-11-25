import './App.scss'
import { NavLink, Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const publicUrl = process.env.PUBLIC_URL

function App() {
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
      <div className="App">
        <div className="AppNavBar">
          <NavLink to="/">index</NavLink>
          <NavLink to="/dogs">dogs</NavLink>
          <NavLink to="/cats">cats</NavLink>
          <NavLink to="/404">404</NavLink>
        </div>
        {/* 子路由对应的组件在 <Outlet /> 处渲染 */}
        <Outlet />
      </div>
    </>
  )
}

export default App
