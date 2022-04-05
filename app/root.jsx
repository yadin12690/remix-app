import { LiveReload, Outlet, Meta, Link, Links, useLoaderData } from 'remix'
import globalStylesUrl from '~/styles/global.css'
import { getUser } from '~/utils/session.server'


export const links = () => [{ rel: 'stylesheet', href: globalStylesUrl }]

export const meta = () => {
  return {
    title: 'Remix app',
    description: 'A description for the route',
    keywords: 'remix, javascript, react'
  }
}

export const loader = async ({ request }) => {
  // We bring the user that logged in data.
  const user = await getUser(request);
  const data = {
    user,
  }
  return data;
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
        <Links />
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
  const { user } = useLoaderData;

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
          <li>
            <Link to='/auth/login'>Login</Link>
          </li>
        </ul>
      </nav>
      <div className='container'>
        {children}
      </div>
    </>
  )
}

// This the main error handling. it's come from Remix and catch most of the errors.
// If we want to catch spesific error in route we should put it in the right route.
export function ErrorBoundary({ error }) {
  console.log(error);
  return (
    <Document>
      <Layout>
        <h1>Error accured</h1>
        <p>{error.message}</p>

      </Layout>
    </Document>
  )
}