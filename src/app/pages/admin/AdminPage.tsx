import {Route, Routes} from 'react-router-dom'
import { MasterLayout } from '../../../_metronic/layout/MasterLayout'
import { DashboardWrapper } from './dashboard/DashboardWrapper'

export const AdminPage = () => {

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='/dashboard' element={<DashboardWrapper />} />
      </Route>
    </Routes>
  )

}

