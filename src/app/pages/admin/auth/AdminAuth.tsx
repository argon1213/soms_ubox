import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import { adminLoginApi } from '../../../store/apis/admin'

const loginSchema = Yup.object().shape({
  userName: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('User name is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  userName: '',
  password: '',
}


export const AdminAuth = () => {
  
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      try {
        // const {data: auth} = await login(values.email, values.password)
        // const {data: user} = await getUserByToken(auth.api_token)
        adminLoginApi({
          username: values.userName,
          password: values.password,
        })
          .then((res) => {
            localStorage.setItem("admin-user", JSON.stringify(res.data.user));
            window.location.href = "/admin";
          })
          .catch((err) => {
            console.log("err", err);
            setStatus('The login details are incorrect')
          })
      } catch (error) {
        console.error(error)
        setStatus('The login details are incorrect')
        setSubmitting(false)
      }
    },
  })

  return (
   
    <div className='w-400px' style={{marginRight: 'auto', marginLeft: 'auto'}}>
      <div style={{marginTop: '150px'}}>
        <h1 className='text-center fs-2tx'>ubox SOMS</h1>
        <form
          className='form w-100'
          onSubmit={formik.handleSubmit}
          noValidate
          autoComplete='off'
          id='kt_login_signin_form'
        >
        {/* begin::Form group */}
          <div className='fv-row mb-8'>
            <label className='form-label fs-6 fw-bolder text-dark'>User Name</label>
            <input
              placeholder='User Name'
              {...formik.getFieldProps('userName')}
              className={clsx(
                'form-control bg-transparent',
                {'is-invalid': formik.touched.userName && formik.errors.userName},
                {
                  'is-valid': formik.touched.userName && !formik.errors.userName,
                }
              )}
              type='text'
              autoComplete='off'
            />
            {formik.touched.userName && formik.errors.userName && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.userName}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}

          {/* begin::Form group */}
          <div className='fv-row mb-8'>
            <label className='form-label fw-bolder text-dark fs-6'>Password</label>
            <input
              id='password'
              type='password'
              placeholder='Password'
              autoComplete='new-password'
              {...formik.getFieldProps('password')}
              className={clsx(
                'form-control bg-transparent',
                {
                  'is-invalid': formik.touched.password && formik.errors.password,
                },
                {
                  'is-valid': formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
          {/* begin::Action */}
          <div className='d-grid mb-10'>
            <button
              type='submit'
              id='kt_sign_in_submit'
              className='btn btn-primary'
              disabled={formik.isSubmitting || !formik.isValid}
            >
              <span className='indicator-label'>Continue</span>
            </button>
          </div>
          {/* end::Action */}
        </form>
      </div>
      <div style={{marginBottom: '100px'}}>
        {formik.status ? (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>{formik.status}</div>
          </div>
        ) : (
          <div className='mb-lg-15 bg-light-info p-8 rounded'>
            <div className='text-info'>
              Use username <strong>demo</strong> and password <strong>demo</strong> to
              continue.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}