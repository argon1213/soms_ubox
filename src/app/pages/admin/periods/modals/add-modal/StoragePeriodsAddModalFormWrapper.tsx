import {useState} from 'react'
import { useListView } from '../../core/PeriodsListViewProvider'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { editPeriodsApi } from '../../../../../store/apis/admin'

export const StoragePeriodsAddModalFormWrapper = () => {

  const { itemIdForUpdate, setItemIdForUpdate, data, fetchPeriodsFunc } = useListView();

  const profileDetailsSchema = Yup.object().shape({
    code: Yup.string().required('The code is required'),
    name: Yup.string().required('Name is required'),
    min: Yup.number()
            .required('The minmum storage is required')
            .positive('This field should be positive integer')
            .integer('This field should be positive integer'),
    max: Yup.number()
            .required('The maximum storage is required')
            .positive('This field should be positive integer')
            .integer('This field should be positive integer'),
  });

  const initialValues = (itemIdForUpdate == null) ? {
    code: "",
    name: "",
    max: undefined,
    min: undefined,
  } : {
    code: data[itemIdForUpdate].code,
    name: data[itemIdForUpdate].name,
    max: data[itemIdForUpdate].max ? data[itemIdForUpdate].max : undefined,
    min: data[itemIdForUpdate].min ? data[itemIdForUpdate].min : undefined,
  }

  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues,
    validationSchema: profileDetailsSchema,
    onSubmit: (values) => {
      setLoading(true);
      (itemIdForUpdate == null) ? 
      editPeriodsApi({data: values, id: undefined})
        .then((res) => {
          setLoading(false);
          setItemIdForUpdate(undefined);
          fetchPeriodsFunc();
        })
        .catch((err) => {
          setLoading(false);
        }) :
      editPeriodsApi({data: values, id: data[itemIdForUpdate].id})
        .then((res) => {
          setLoading(false);
          setItemIdForUpdate(undefined);
          fetchPeriodsFunc();
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
                  <span className='required'>Minimum storage period</span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='number'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Minimum storage month'
                    {...formik.getFieldProps('min')}
                  />
                  {formik.touched.min && formik.errors.min && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.min}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>Maximum storage period</span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='number'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Maximum storage month'
                    {...formik.getFieldProps('max')}
                  />
                  {formik.touched.max && formik.errors.max && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.max}</div>
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