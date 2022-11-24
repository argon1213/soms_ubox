import {Route, Routes, Navigate} from 'react-router-dom'
import {ForgotPassword} from './components/ForgotPassword'
import Login from './components/Login'

const AuthPage = () => (
  <Routes>
    <Route>
      <Route path='login' element={<Login />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route index element={<Navigate to="login" />} />
      <Route path='*' element={<Navigate to="login" />} />
    </Route>
  </Routes>
)

export {AuthPage}
