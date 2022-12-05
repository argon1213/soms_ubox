/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import { AdminPage } from '../pages/admin/AdminPage'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {Logout, AuthPage} from '../modules/auth'
import {App} from '../App'

import Home from '../pages/order/index'

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const {PUBLIC_URL} = process.env

const useAuth = () => {
  const user = localStorage.getItem("ubox-user");
  user ? localStorage.setItem("ubox-is-authenticated", '1') : localStorage.setItem("ubox-is-authenticated", '0');
  if(user) {
    return JSON.parse(user);
  } else {
    return undefined;
  }
}

const AppRoutes: FC = () => {
  const currentUser = useAuth();

  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />

          <Route path='admin' element={<Navigate to='dashboard' />} />
          <Route path='admin/*' element={<AdminPage />} />
          
          {currentUser ? (
            <>
              <Route path='' element={<Home />} />
              <Route path='/*' element={<PrivateRoutes />} />
            </>
          ) : (
            <>
              <Route path='' element={<Home />} />
              <Route path='client/*' element={<AuthPage />} />
              <Route path='*' element={<Navigate to='' />} />
            </>
          )}

          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
