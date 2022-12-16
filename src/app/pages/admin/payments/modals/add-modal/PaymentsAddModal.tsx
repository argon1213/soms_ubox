import {useEffect} from 'react'
// import {UserEditModalHeader} from './UserEditModalHeader'
// import {UserEditModalFormWrapper} from './UserEditModalFormWrapper'
import { KTSVG } from '../../../../../../_metronic/helpers'
import { usePaymentsListView } from '../../core/PaymentsListViewProvider'
import { PaymentsAddModalFormWrapper } from './PaymentsAddModalFormWrapper'

export const PaymentsAddModal = () => {

  const { setItemIdForUpdate } = usePaymentsListView();

  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [])

  return (
    <>
      <div
        className='modal fade show d-block'
        id='kt_modal_add_user'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        {/* begin::Modal dialog */}
        <div className='modal-dialog modal-dialog-centered mw-650px'>
          {/* begin::Modal content */}
          <div className='modal-content'>
            <div className='modal-header'>
              {/* begin::Modal title */}
              <h2 className='fw-bolder fs-1 px-7'>Client</h2>
              {/* end::Modal title */}

              {/* begin::Close */}
              <div
                className='btn btn-icon btn-sm btn-active-icon-primary'
                data-kt-users-modal-action='close'
                onClick={() => setItemIdForUpdate(undefined)}
                style={{cursor: 'pointer'}}
              >
                <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
              </div>
              {/* end::Close */}
            </div>
            {/* begin::Modal body */}
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
              <PaymentsAddModalFormWrapper />
            </div>
            {/* end::Modal body */}
          </div>
          {/* end::Modal content */}
        </div>
        {/* end::Modal dialog */}
      </div>
      {/* begin::Modal Backdrop */}
      <div className='modal-backdrop fade show'></div>
      {/* end::Modal Backdrop */}
    </>
  )
}
