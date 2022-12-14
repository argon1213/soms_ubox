/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {useIntl} from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
// import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {PageTitle} from '../../../../_metronic/layout/core'
import { StatisticsWidget5 } from '../../../../_metronic/partials/widgets'
import { fetchUniversities } from '../../../store/actions/admin'
import { RootState } from '../../../store/reducers'

const DashboardPage: FC = () => {

  const dispatch = useDispatch();
  const universities = useSelector((state:RootState) => state.admin.universities);
  // dispatch(fetchUniversities());


  useEffect(() => {
    dispatch(fetchUniversities());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(universities.length > 0) {
      console.log("universities", universities);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [universities])


  return(
    <div className='row'>
      {
        universities.length > 0 && universities.map((university, index) => (
          <div className='col-xl-3 col-md-4 col-sm-6 py-5' key={index} >
            <StatisticsWidget5
              className='card-xl-stretch mb-xl-8 min-h-200px'
              svgIcon='/media/icons/duotune/ecommerce/ecm008.svg'
              iconColor='white'
              color='warning'
              title={university.ordersCount}
              titleColor='white'
              description={university.label}
              descriptionColor='white'
            />
          </div>
        ))
        
      }
    </div>
  )
}

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
