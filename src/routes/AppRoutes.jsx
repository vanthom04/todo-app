import { lazy, Suspense } from 'react'
import { Outlet, useRoutes } from 'react-router-dom'

import config from '~/config'

const HomePage = lazy(() => import('~/pages/Home'))
const SignInPage = lazy(() => import('~/pages/SignIn'))
const SignUpPage = lazy(() => import('~/pages/SignUp'))

function AppRoutes() {
  return useRoutes([
    {
      element: (
        <Suspense>
          <Outlet />
        </Suspense>
      ),
      children: [
        { element: <HomePage />, index: true }
      ]
    },
    {
      element: <SignInPage />,
      path: config.routes.signIn
    },
    {
      element: <SignUpPage />,
      path: config.routes.signUp
    }
  ])
}

export default AppRoutes
