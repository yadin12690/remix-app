import { LiveReload, Outlet, Meta, Link, Links } from 'remix'

export const meta = () => {
  return {
    title: 'Remix app',
    description: 'A description for the route',
    keywords: 'remix, javascript, react'
  }
}

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

function Document({ children }) {
  return (
    <html lang="en">
      <head>
        <Meta />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
    </html>
  )
}

function Layout({ children }) {
  return (
    <>
      <nav className="navbar">
        <Link to='/' className='logo'>
          Main remix app
        </Link>
        <ul className='nav'>
          <li>
            <Link to='/posts'>Posts</Link>
          </li>
        </ul>
      </nav>
      <div className='container'>
        {children}
      </div>
    </>
  )
}