import './App.scss'
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
