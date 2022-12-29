import {useEffect} from 'react'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {KTSVG} from '../../../../../../_metronic/helpers'
import { useOrdersListView } from '../../core/OrdersListViewProvider'

const UsersListFilter = () => {
  const {filterData, setFilterData, fetchOrdersFunc } = useOrdersListView();
  const isLoading = false;

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const applyHandler = () => {
    fetchOrdersFunc();
  };

  const resetHandler = () => {
    setFilterData({
      name: "",
      email: "",
      contact: "",
      wechat: "",
      student_id: "",
      code: "",
      emptyDateStart: "",
      emptyDateEnd: "",
      checkinDateStart: "",
      checkinDateEnd: "",
      checkoutDateStart: "",
      checkoutDateEnd: "",
      status: {
        new: false,
        inProgress: false,
        emptyDelivery: false,
        schedCheckin: false,
        checkin: false,
        schedCheckout: false,
        checkout: false,
        schedEmptyReturn: false,
        completed: false,
        hold: false,
        cancelled: false
      },
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
      <div className='menu menu-sub menu-sub-dropdown w-600px w-md-625px h-450px modal' data-kt-menu='true'>
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
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Name</label>
              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Name'
                  value={filterData.name}
                  onChange={(e) => {setFilterData({...filterData, name: e.target.value})}}
                />
              </div>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Email</label>
              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Email'
                  value={filterData.email}
                  onChange={(e) => {setFilterData({...filterData, email: e.target.value})}}
                />
              </div>
            </div>
          </div>
         
          <div className='col-lg-6'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Contact</label>
              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Contact'
                  value={filterData.contact}
                  onChange={(e) => {setFilterData({...filterData, contact: e.target.value})}}
                />
              </div>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Student ID</label>
              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Student ID'
                  value={filterData.student_id}
                  onChange={(e) => {setFilterData({...filterData, student_id: e.target.value})}}
                />
              </div>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Wechat ID</label>
              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Wechat ID'
                  value={filterData.wechat}
                  onChange={(e) => {setFilterData({...filterData, wechat: e.target.value})}}
                />
              </div>
            </div>
          </div>

          <div className='col-lg-6'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>The code</label>
              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='The code'
                  value={filterData.code}
                  onChange={(e) => {setFilterData({...filterData, code: e.target.value})}}
                />
              </div>
            </div>
          </div>

          <div className='col-lg-6'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Emptybox date start</label>
              <div className='col-lg-8 fv-row'>
                <input
                  type='date'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Emptybox date start'
                  value={filterData.emptyDateStart}
                  onChange={(e) => {setFilterData({...filterData, emptyDateStart: e.target.value})}}
                />
              </div>
            </div>
          </div>

          <div className='col-lg-6'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Emptybox date start</label>
              <div className='col-lg-8 fv-row'>
                <input
                  type='date'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Emptybox date start'
                  value={filterData.emptyDateEnd}
                  onChange={(e) => {setFilterData({...filterData, emptyDateEnd: e.target.value})}}
                />
              </div>
            </div>
          </div>

          <div className='col-lg-6'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Storage date start</label>
              <div className='col-lg-8 fv-row'>
                <input
                  type='date'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Storage date start'
                  value={filterData.checkinDateStart}
                  onChange={(e) => {setFilterData({...filterData, checkinDateStart: e.target.value})}}
                />
              </div>
            </div>
          </div>

          <div className='col-lg-6'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Storage date end</label>
              <div className='col-lg-8 fv-row'>
                <input
                  type='date'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Storage date end'
                  value={filterData.checkinDateEnd}
                  onChange={(e) => {setFilterData({...filterData, checkinDateEnd: e.target.value})}}
                />
              </div>
            </div>
          </div>

          <div className='col-lg-6'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Pick-up date start</label>
              <div className='col-lg-8 fv-row'>
                <input
                  type='date'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Pick-up date start'
                  value={filterData.checkoutDateStart}
                  onChange={(e) => {setFilterData({...filterData, checkoutDateStart: e.target.value})}}
                />
              </div>
            </div>
          </div>

          <div className='col-lg-6'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Pick-up date end</label>
              <div className='col-lg-8 fv-row'>
                <input
                  type='date'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Pick-up date end'
                  value={filterData.checkoutDateEnd}
                  onChange={(e) => {setFilterData({...filterData, checkoutDateEnd: e.target.value})}}
                />
              </div>
            </div>
          </div>

          <div className='col-lg-12'>
            <div className='row mb-6'>
              <label className='col-lg-2 col-form-label fw-bold fs-6'>Status</label>
              <div className='col-lg-10'>
                <div className='row'>
                  <label className='col-lg-4 form-check form-check-sm form-check-custom form-check-solid mb-5'>
                    <input 
                      className='form-check-input' 
                      type='checkbox' 
                      checked={filterData.status.new} 
                      onChange={(e) => {setFilterData({...filterData, status: {...filterData.status, new: !filterData.status.new}})}}
                    />
                    <span className='form-check-label'>New</span>
                  </label>
                  <label className='col-lg-4 form-check form-check-sm form-check-custom form-check-solid mb-5'>
                    <input 
                      className='form-check-input' 
                      type='checkbox' 
                      checked={filterData.status.inProgress} 
                      onChange={(e) => {setFilterData({...filterData, status: {...filterData.status, inProgress: !filterData.status.inProgress}})}}
                    />
                    <span className='form-check-label'>In Progress</span>
                  </label>
                  <label className='col-lg-4 form-check form-check-sm form-check-custom form-check-solid mb-5'>
                    <input 
                      className='form-check-input' 
                      type='checkbox' 
                      checked={filterData.status.emptyDelivery} 
                      onChange={(e) => {setFilterData({...filterData, status: {...filterData.status, emptyDelivery: !filterData.status.emptyDelivery}})}}
                    />
                    <span className='form-check-label'>Empty Delivery</span>
                  </label>
                  <label className='col-lg-4 form-check form-check-sm form-check-custom form-check-solid mb-5'>
                    <input 
                      className='form-check-input' 
                      type='checkbox' 
                      checked={filterData.status.schedCheckin} 
                      onChange={(e) => {setFilterData({...filterData, status: {...filterData.status, schedCheckin: !filterData.status.schedCheckin}})}}
                    />
                    <span className='form-check-label'>Sch Check-In</span>
                  </label>
                  <label className='col-lg-4 form-check form-check-sm form-check-custom form-check-solid mb-5'>
                    <input 
                      className='form-check-input' 
                      type='checkbox' 
                      checked={filterData.status.checkin} 
                      onChange={(e) => {setFilterData({...filterData, status: {...filterData.status, checkin: !filterData.status.checkin}})}}
                    />
                    <span className='form-check-label'>Check-In</span>
                  </label>
                  <label className='col-lg-4 form-check form-check-sm form-check-custom form-check-solid mb-5'>
                    <input 
                      className='form-check-input' 
                      type='checkbox' 
                      checked={filterData.status.schedCheckout} 
                      onChange={(e) => {setFilterData({...filterData, status: {...filterData.status, schedCheckout: !filterData.status.schedCheckout}})}}
                    />
                    <span className='form-check-label'>Sch Check-Out</span>
                  </label>
                  <label className='col-lg-4 form-check form-check-sm form-check-custom form-check-solid mb-5'>
                    <input 
                      className='form-check-input' 
                      type='checkbox' 
                      checked={filterData.status.checkout} 
                      onChange={(e) => {setFilterData({...filterData, status: {...filterData.status, checkout: !filterData.status.checkout}})}}
                    />
                    <span className='form-check-label'>Check-Out</span>
                  </label>
                  <label className='col-lg-4 form-check form-check-sm form-check-custom form-check-solid mb-5'>
                    <input 
                      className='form-check-input' 
                      type='checkbox' 
                      checked={filterData.status.schedEmptyReturn} 
                      onChange={(e) => {setFilterData({...filterData, status: {...filterData.status, schedEmptyReturn: !filterData.status.schedEmptyReturn}})}}
                    />
                    <span className='form-check-label'>Sch Empty Return</span>
                  </label>
                  <label className='col-lg-4 form-check form-check-sm form-check-custom form-check-solid mb-5'>
                    <input 
                      className='form-check-input' 
                      type='checkbox' 
                      checked={filterData.status.completed} 
                      onChange={(e) => {setFilterData({...filterData, status: {...filterData.status, completed: !filterData.status.completed}})}}
                    />
                    <span className='form-check-label'>Completed</span>
                  </label>
                  <label className='col-lg-4 form-check form-check-sm form-check-custom form-check-solid mb-5'>
                    <input 
                      className='form-check-input' 
                      type='checkbox' 
                      checked={filterData.status.hold} 
                      onChange={(e) => {setFilterData({...filterData, status: {...filterData.status, hold: !filterData.status.hold}})}}
                    />
                    <span className='form-check-label'>Hold</span>
                  </label>
                  <label className='col-lg-4 form-check form-check-sm form-check-custom form-check-solid mb-5'>
                    <input 
                      className='form-check-input' 
                      type='checkbox' 
                      checked={filterData.status.cancelled} 
                      onChange={(e) => {setFilterData({...filterData, status: {...filterData.status, cancelled: !filterData.status.cancelled}})}}
                    />
                    <span className='form-check-label'>Cancelled</span>
                  </label>
                </div>
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
