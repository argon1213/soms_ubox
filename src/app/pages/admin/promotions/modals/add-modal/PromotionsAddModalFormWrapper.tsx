import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { usePromotionsListView } from '../../core/PromotionsListViewProvider'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { editPromotionApi } from '../../../../../store/apis/admin'
import { fetchPromotions } from '../../../../../store/actions/admin'
import dayjs from "dayjs"

export const PromotionsAddModalFormWrapper = () => {

  const dispatch = useDispatch();
  const { itemIdForUpdate, setItemIdForUpdate, data, pagination } = usePromotionsListView();

  const profileDetailsSchema = Yup.object().shape({
    code: Yup.string().required('The code is required'),
    name: Yup.string().required('Name is required'),
    effective_from: Yup.string()
            .required('The minmum storage is required'),
    effective_to: Yup.string()
            .required('The maximum storage is required')
  });

  const initialValues = (itemIdForUpdate == null) ? {
    code: "",
    name: "",
    effective_from: undefined,
    effective_to: undefined,
  } : {
    code: data[itemIdForUpdate].code,
    name: data[itemIdForUpdate].name,
    effective_from: data[itemIdForUpdate].effective_from ? dayjs(data[itemIdForUpdate].effective_from).format("YYYY-MM-DD") : undefined,
    effective_to: data[itemIdForUpdate].effective_to ? dayjs(data[itemIdForUpdate].effective_to).format("YYYY-MM-DD") : undefined,
  }

  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues,
    validationSchema: profileDetailsSchema,
    onSubmit: (values) => {
      setLoading(true);
      (itemIdForUpdate == null) ? 
      editPromotionApi({data: values, id: undefined})
        .then((res) => {
          setLoading(false);
          setItemIdForUpdate(undefined);
          dispatch(fetchPromotions({...pagination}));
        })
        .catch((err) => {
          setLoading(false);
        }) :
      editPromotionApi({data: values, id: data[itemIdForUpdate].id})
        .then((res) => {
          setLoading(false);
          setItemIdForUpdate(undefined);
          dispatch(fetchPromotions({...pagination}));
        })
        .catch((err) => {
          setLoading(false);
        })
    },
  })

  return (
    <>
      <div className='card mb-5 mb-xl-10'>

        <div id='kt_account_profile_details' className='collapse show'>
          <form onSubmit={formik.handleSubmit} noValidate className='form'>
            <div className='card-body border-top p-9'>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>The code</label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Code'
                    {...formik.getFieldProps('code')}
                  />
                  {formik.touched.code && formik.errors.code && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.code}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>Name</span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Name'
                    {...formik.getFieldProps('name')}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.name}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>Expiry date(by)</span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='date'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='From'
                    {...formik.getFieldProps('effective_from')}
                  />
                  {formik.touched.effective_from && formik.errors.effective_from && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.effective_from}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>Valid(until)</span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='date'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='To'
                    {...formik.getFieldProps('effective_to')}
                  />
                  {formik.touched.effective_to && formik.errors.effective_to && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.effective_to}</div>
                    </div>
                  )}
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