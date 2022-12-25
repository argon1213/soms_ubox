/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useIntl} from 'react-intl'
import { useSelector } from 'react-redux'
// import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {PageTitle} from '../../../../_metronic/layout/core'
import { RootState } from '../../../store/reducers'
import { UniversityWidget } from './UniversityWidget'
import { LoadingSpinner } from '../components/spinner/LoadingSpinner'

const DashboardPage: FC = () => {

  const universities = useSelector((state:RootState) => state.admin.universities);
  const isLoading = useSelector((state:RootState) => state.admin.loading);

  const getColor = (index: number) => {
    switch(index) {
      case 0:
        return "warning";
      case 1:
        return "success";
      case 2:
        return "primary";
      case 3:
        return "danger";
      case 4:
        return "info";
      case 5:
        return "primary";
      case 6:
        return "success";
      case 7:
        return "warning";
      case 8:
        return "danger";
      case 9:
        return "info";
      default: 
        return "";
    }
  }


  return(
    <>
      <div className='row'>
        {
          universities.length > 0 && universities.map((university, index) => (
            <div className='col-xl-3 col-md-4 col-sm-6 py-5' key={index} >
              <UniversityWidget
                location={'/admin/orders/' + university?.id}
                className='card-xl-stretch mb-xl-8 min-h-200px'
                svgIcon='/media/icons/duotune/ecommerce/ecm008.svg'
                iconColor='white'
                color={getColor(university?.id)}
                title={university.ordersCount}
                titleColor='white'
                description={university.label}
                descriptionColor='white'
              />
            </div>
          ))
          
        }
      </div>
      {isLoading && <LoadingSpinner />}
    </>
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
