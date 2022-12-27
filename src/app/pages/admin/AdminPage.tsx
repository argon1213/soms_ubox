import {Route, Routes, Navigate} from 'react-router-dom'
import { ErrorsPage } from '../../modules/errors/ErrorsPage'
import { MasterLayout } from '../../../_metronic/layout/MasterLayout'
import { DashboardWrapper } from './dashboard/DashboardWrapper'
import { ClientsList } from './customers/ClientsList'
import { StoragePeriodsList } from './periods/StoragePeriod'
import { PromotionsList } from './promotions/PromotionsList'
import { PaymentsList } from './payments/PaymentsList'
import { OrdersList } from './orders/OrdersList'
import { AdminAuth } from './auth/AdminAuth'

const useAuth = () => {
  const adminAuth: any = localStorage.getItem("admin-user");
  // const adminAuth :any = localStorage.getItem("admin-user") ? JSON.parse(localStorage.getItem("admin-user")) : undefined;
  if(adminAuth) {
    return true;
  } else {
    return false;
  }
}

export const AdminPage = () => {

  const currentAdmin = useAuth();

  return (
    <Routes>
      {
        currentAdmin ? (
          <>
            <Route path='/auth' element={<Navigate to='/admin/dashboard' />} />
            <Route element={<MasterLayout />}>
              <Route path='/dashboard' element={<DashboardWrapper />} />
              <Route path='/clients' element={<ClientsList />} />
              <Route path='/storage-periods' element={<StoragePeriodsList />} />
              <Route path='/promotions' element={<PromotionsList />} />
              <Route path='/payments' element={<PaymentsList />} />
              <Route path='/payments/:orderId' element={<PaymentsList />} />
              <Route path='/orders/:uid' element={<OrdersList />} />
              <Route path='/orders/:uid/:clientName' element={<OrdersList />} />
            </Route>
            <Route path='/*' element={<ErrorsPage />} />
          </>
        ) : (
          <>
            <Route path='/auth' element={<AdminAuth />} />
            <Route path='/*' element={<Navigate to='/admin/auth' />} />
          </>
        )
      }
     
    </Routes>
  )

}

