import {useEffect} from 'react'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {KTSVG} from '../../../../../../_metronic/helpers'
import { usePaymentsListView } from '../../core/PaymentsListViewProvider'

const UsersListFilter = () => {
  const {filterData, setFilterData, fetchPaymentsFunc } = usePaymentsListView();
  const isLoading = false;

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const applyHandler = () => {
    fetchPaymentsFunc();
  };

  const resetHandler = () => {
    setFilterData({
     order_id: "",
     amount: "",
    });
  };

  return (
    <>
      {/* begin::Filter Button */}
      <button
        disabled={isLoading}
        type='button'
        className='btn btn-light-primary me-3 d-flex justify-content-around align-items-center'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-start'
      >
        <KTSVG path='/media/icons/duotune/general/gen031.svg' className='svg-icon-2' />
        Filter
      </button>
      {/* end::Filter Button */}
      {/* begin::SubMenu */}
      <div className='menu menu-sub menu-sub-dropdown w-600px w-md-625px' data-kt-menu='true'>
        {/* begin::Header */}
        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bolder'>Filter Options</div>
        </div>
        {/* end::Header */}

        {/* begin::Separator */}
        <div className='separator border-gray-200'></div>
        {/* end::Separator */}

        {/* begin::Content */}
        <div className='px-7 py-5' data-kt-user-table-filter='form'>
          {/* begin::Input group */}
        <div className='row'>

          <div className='col-lg-6'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Order ID</label>
              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Order ID'
                  value={filterData.order_id}
                  onChange={(e) => {setFilterData({...filterData, order_id: e.target.value})}}
                />
              </div>
            </div>
          </div>

          <div className='col-lg-6'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Amount</label>
              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Amount'
                  value={filterData.amount}
                  onChange={(e) => {setFilterData({...filterData, amount: e.target.value})}}
                />
              </div>
            </div>
          </div>
          
        </div>
          {/* end::Input group */}

          {/* begin::Actions */}
          <div className='d-flex justify-content-end'>
            <button
              type='button'
              disabled={isLoading}
              onClick={resetHandler}
              className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
            >
              Reset
            </button>
            <button
              disabled={isLoading}
              type='button'
              onClick={applyHandler}
              className='btn btn-primary fw-bold px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='filter'
            >
              Apply
            </button>
          </div>
          {/* end::Actions */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::SubMenu */}
    </>
  )
}

export {UsersListFilter}
