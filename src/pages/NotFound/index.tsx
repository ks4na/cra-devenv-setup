import { FC } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const publicUrl = process.env.PUBLIC_URL

const NotFound: FC = () => {
  const { pathname } = useLocation()
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
        <link
          rel="shortcut icon"
          href={`${publicUrl}/favicon.ico`}
          type="image/x-icon"
        />
      </Helmet>
      <h2>Page Not Found: {pathname}</h2>
      <Link to="/">Back to Index Page</Link>
    </>
  )
}

export default NotFound
