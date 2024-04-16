import { lazy, Suspense } from 'react'
import { Outlet, useRoutes } from 'react-router-dom'

const HomePage = lazy(() => import('~/pages/Home'))
const LoginPage = lazy(() => import('~/pages/Login'))
const RegisterPage = lazy(() => import('~/pages/Register'))

function Router() {
  const routes = useRoutes([
    {
      element: (
        <Suspense>
          <Outlet />
        </Suspense>
      ),
      children: [
        { element: <HomePage />, path: '/' }
      ]
    },
    {
      element: <LoginPage />,
      path: '/login'
    },
    {
      element: <RegisterPage />,
      path: '/register'
    }
  ])

  return routes
}

export default Router
