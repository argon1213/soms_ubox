import {useState} from 'react'
// import { useDispatch } from 'react-redux'
import { useOrdersListView } from '../../core/OrdersListViewProvider'
// import {IProfileDetails, profileDetailsInitValues as initialValues} from '../SettingsModel'
import * as Yup from 'yup'
import {useFormik} from 'formik'
// import { editOrderApi } from '../../../../../store/apis/admin'
// import { fetchOrders } from '../../../../../store/actions/admin'

export const OrdersAddModalFormWrapper = () => {

  // const dispatch = useDispatch();
  const { itemIdForUpdate, setItemIdForUpdate, data } = useOrdersListView();

  const profileDetailsSchema = Yup.object().shape({
    emptyout_location_other: Yup.string()
              .required('Name is required')
              .min(3, 'Name 3 symbols')
              .max(50, 'Name 50 symbols'),
    emptyout_date_other: Yup.date()
              .required('Date is required'),
    emptyout_time_other: Yup.string()
              .required('Time is required'),
    checkin_location_other: Yup.string()
              .required('Name is required')
              .min(3, 'Name 3 symbols')
              .max(50, 'Name 50 symbols'),
    checkin_date_other: Yup.date()
              .required('Date is required'),
    checkin_time_other: Yup.string()
              .required('Time is required'),
    checkout_location_other: Yup.string()
              .required('Name is required')
              .min(3, 'Name 3 symbols')
              .max(50, 'Name 50 symbols'),
    checkout_date_other: Yup.date()
              .required('Date is required'),
    checkout_time_other: Yup.string()
              .required('Time is required'),
  });

  const initialValues = (itemIdForUpdate == null) ? {
    emptyout_location_other: "",
    emptyout_date_other: "",
    emptyout_time_other: "",
    checkin_location_other: "",
    checkin_date_other: "",
    checkin_time_other: "",
    checkout_location_other: "",
    checkout_date_other: "",
    checkout_time_other: "",
    special_instruction: "",
  } : {
    emptyout_location_other: data[itemIdForUpdate].emptyout_location_other ? data[itemIdForUpdate].emptyout_location_other : "",
    emptyout_date_other: data[itemIdForUpdate].emptyout_date_other ? data[itemIdForUpdate].emptyout_date_other : "",
    emptyout_time_other: data[itemIdForUpdate].emptyout_time_other ? data[itemIdForUpdate].emptyout_time_other : "",
    checkin_location_other: data[itemIdForUpdate].checkin_location_other ? data[itemIdForUpdate].checkin_location_other : "",
    checkin_date_other: data[itemIdForUpdate].checkin_date_other ? data[itemIdForUpdate].checkin_date_other : "",
    checkin_time_other: data[itemIdForUpdate].checkin_time_other ? data[itemIdForUpdate].checkin_time_other : "",
    checkout_location_other: data[itemIdForUpdate].checkout_location_other ? data[itemIdForUpdate].checkout_location_other : "",
    checkout_date_other: data[itemIdForUpdate].checkout_date_other ? data[itemIdForUpdate].checkout_date_other : "",
    checkout_time_other: data[itemIdForUpdate].checkout_time_other ? data[itemIdForUpdate].checkout_time_other : "",
    special_instruction: data[itemIdForUpdate].special_instruction ? data[itemIdForUpdate].special_instruction : "",
  }

  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues,
    validationSchema: profileDetailsSchema,
    onSubmit: (values) => {
      setLoading(true);
      setItemIdForUpdate(undefined);

      // (itemIdForUpdate == null) ? 
      // editOrderApi({data: values, id: undefined})
      //   .then((res) => {
      //     setLoading(false);
      //     setItemIdForUpdate(undefined);
      //     dispatch(fetchOrders({uid, ...pagination}));
      //   })
      //   .catch((err) => {
      //     setLoading(false);
      //   }) :
      // editOrderApi({data: values, id: data[itemIdForUpdate].id})
      //   .then((res) => {
      //     setLoading(false);
      //     setItemIdForUpdate(undefined);
      //     dispatch(fetchOrders({uid, ...pagination}));
      //   })
      //   .catch((err) => {
      //     setLoading(false);
      //   })
    },
  })

  return (
    <>
      <div className='card mb-5 mb-xl-10'>

        <div id='kt_account_profile_details' className='collapse show'>
          <form onSubmit={formik.handleSubmit} noValidate className='form'>
            <div className='card-body border-top p-9'>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>The code</label>
                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    disabled
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Code'
                    value={(itemIdForUpdate === undefined || itemIdForUpdate == null ) ? "" : data[itemIdForUpdate].code}
                  />
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>Name</label>
                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    disabled
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Name'
                    value={(itemIdForUpdate === undefined || itemIdForUpdate == null ) ? "" : data[itemIdForUpdate].client.name}
                  />
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>Empty box location</span>
                </label>
                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Empty box location'
                    {...formik.getFieldProps('emptyout_location_other')}
                  />
                  {formik.touched.emptyout_location_other && formik.errors.emptyout_location_other && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.emptyout_location_other}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>Empty box date</span>
                </label>
                <div className='col-lg-8 fv-row'>
                  <input
                    type='date'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Empty box date'
                    {...formik.getFieldProps('emptyout_date_other')}
                  />
                  {formik.touched.emptyout_date_other && formik.errors.emptyout_date_other && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.emptyout_date_other}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>Empty box time</span>
                </label>
                <div className='col-lg-8 fv-row'>
                  <input
                    type='string'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Empty box time'
                    {...formik.getFieldProps('emptyout_time_other')}
                  />
                  {formik.touched.emptyout_time_other && formik.errors.emptyout_time_other && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.emptyout_time_other}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>Storage location</span>
                </label>
                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Storage location'
                    {...formik.getFieldProps('checkin_location_other')}
                  />
                  {formik.touched.checkin_location_other && formik.errors.checkin_location_other && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.checkin_location_other}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>Storage date</span>
                </label>
                <div className='col-lg-8 fv-row'>
                  <input
                    type='date'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Storage date'
                    {...formik.getFieldProps('checkin_date_other')}
                  />
                  {formik.touched.checkin_date_other && formik.errors.checkin_date_other && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.checkin_date_other}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>Storage time</span>
                </label>
                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Storage time'
                    {...formik.getFieldProps('checkin_time_other')}
                  />
                  {formik.touched.checkin_time_other && formik.errors.checkin_time_other && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.checkin_time_other}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>Pickup location</span>
                </label>
                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Pickup location'
                    {...formik.getFieldProps('checkout_location_other')}
                  />
                  {formik.touched.checkout_location_other && formik.errors.checkout_location_other && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.checkout_location_other}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>Pickup date</span>
                </label>
                <div className='col-lg-8 fv-row'>
                  <input
                    type='date'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Pickup date'
                    {...formik.getFieldProps('checkout_date_other')}
                  />
                  {formik.touched.checkout_date_other && formik.errors.checkout_date_other && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.checkout_date_other}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>Pickup time</span>
                </label>
                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Pickup time'
                    {...formik.getFieldProps('checkout_time_other')}
                  />
                  {formik.touched.checkout_time_other && formik.errors.checkout_time_other && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.checkout_time_other}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>Special instruction</label>
                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    disabled
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Special instruction'
                    value={(itemIdForUpdate === undefined || itemIdForUpdate == null ) ? "" : data[itemIdForUpdate].special_instruction}
                  />
                </div>
              </div>

            </div>

            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <button type='submit' className='btn btn-primary' disabled={loading}>
                {!loading && 'Save Changes'}
                {loading && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}