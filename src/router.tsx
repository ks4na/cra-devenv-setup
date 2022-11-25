import { createBrowserRouter } from 'react-router-dom'
import App from 'src/App'
import IndexPage from 'src/pages/IndexPage'
import DogsPage from 'src/pages/Dogs'
import CatsPage from 'src/pages/Cats'
import NotFound from 'src/pages/NotFound'

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
      element: <NotFound />,
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
)
