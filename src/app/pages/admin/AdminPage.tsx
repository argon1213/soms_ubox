import {Route, Routes} from 'react-router-dom'
import { MasterLayout } from '../../../_metronic/layout/MasterLayout'
import { DashboardWrapper } from './dashboard/DashboardWrapper'
import { ClientsList } from './customers/ClientsList'
import { StoragePeriodsList } from './periods/StoragePeriod'

export const AdminPage = () => {

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='/dashboard' element={<DashboardWrapper />} />
        <Route path='/clients' element={<ClientsList />} />
        <Route path='/storage-periods' element={<StoragePeriodsList />} />
      </Route>
    </Routes>
  )

}

