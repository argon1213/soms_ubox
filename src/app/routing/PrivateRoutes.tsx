// import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'

// import {MasterLayout} from '../../_metronic/layout/MasterLayout'
// import TopBarProgress from 'react-topbar-progress-indicator'
// import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
// import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
// import {WithChildren} from '../../_metronic/helpers'
import ClientLayout from '../components/layout/ClientLayout'
import ClientPortal from '../pages/client/ClientPortal'
import AccountEdit from '../pages/client/AccountEdit'
import OrderDetail from '../pages/client/OrderDetail'

const PrivateRoutes = () => {

  return (
    <Routes>
      <Route element={<ClientLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='client' element={<Navigate to='dashboard' />} />
        <Route path='client/login/*' element={<Navigate to='/client/dashboard'/>} />
        {/* Pages */}
        <Route path='client/dashboard' element={<ClientPortal />} />
        <Route path="client/account" element={<AccountEdit />} />
        <Route path='client/order/:id' element={<OrderDetail />} />
        <Route path='client/*' element={<Navigate to='dashboard' />} />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
        {/* <Route path='*' element={<Navigate to='/error/404' />} /> */}
      </Route>
    </Routes>
  )
}

export {PrivateRoutes}
