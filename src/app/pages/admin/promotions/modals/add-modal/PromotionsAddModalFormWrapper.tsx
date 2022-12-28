import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { usePromotionsListView } from '../../core/PromotionsListViewProvider'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { editPromotionApi, editPromotionItemApi } from '../../../../../store/apis/admin'
import dayjs from "dayjs"
import { RootState } from '../../../../../store/reducers'

export const PromotionsAddModalFormWrapper = () => {

  const { itemIdForUpdate, setItemIdForUpdate, data, fetchPromotionFunc } = usePromotionsListView();
  const products = useSelector((state:RootState) => state.admin.products);
  const [loading, setLoading] = useState(false);

  const [price, setPrice] = useState({
    documentBox: "",
    overisizeBox: "",
    wardrobeBox: "",
    packageBox: "",
  });

  useEffect(() => {
    let __documentBox = "";
    let __overisizeBox = "";
    let __wardrobeBox = "";
    let __packageBox = "";

    if(data.length > 0 && itemIdForUpdate !== undefined && itemIdForUpdate !== null) {
      let items = data[itemIdForUpdate].items;

      if(items && items.length > 0) {
        items.forEach((item) => {
          if(item.item_id === 2) {
            __documentBox = item.price;
          } else if(item.item_id === 4) {
            __overisizeBox = item.price;
          } else if(item.item_id === 9) {
            __wardrobeBox = item.price;
          } else if(item.item_id === 10) {
            __packageBox = item.price;
          }
        })
      }
      let __price = {
        documentBox: __documentBox,
        overisizeBox: __overisizeBox,
        wardrobeBox: __wardrobeBox,
        packageBox: __packageBox
      }
      console.log("price", __price);
      setPrice({...__price});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, itemIdForUpdate]);

  const submitPromotionItem = (e: any) => {
    e.preventDefault();
    setLoading(true);
    (itemIdForUpdate !== null) && editPromotionItemApi({data: price, id: (itemIdForUpdate !== undefined) ? data[itemIdForUpdate].id : ""})
      .then((res) => {
        setLoading(false);
        fetchPromotionFunc();
        setItemIdForUpdate(undefined);
      })
      .catch(() => {
        setLoading(false);
      })
  }

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
          fetchPromotionFunc();
        })
        .catch((err) => {
          setLoading(false);
        }) :
      editPromotionApi({data: values, id: data[itemIdForUpdate].id})
        .then((res) => {
          setLoading(false);
          setItemIdForUpdate(undefined);
          fetchPromotionFunc();
        })
        .catch((err) => {
          setLoading(false);
        })
    },
  })

  return (
    <>
    {
      itemIdForUpdate !== null &&
      <div className='card-toolbar'>
        <ul className='nav'>
          <li className='nav-item'>
            <a
              className='nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary active fw-bold px-4 me-1'
              data-bs-toggle='tab'
              href='#kt_tab_1'
            >
              Basic
            </a>
          </li>
          <li className='nav-item'>
            <a
              className='nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bold px-4 me-1'
              data-bs-toggle='tab'
              href='#kt_tab_2'
            >
              Item
            </a>
          </li>
        </ul>
      </div>
    }

      <div className='card-body py-3'>
        <div className='tab-content'>
          <div className='tab-pane fade show active' id='kt_tab_1'>

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
          </div>

          <div className='tab-pane fade' id='kt_tab_2'>
            <div className='card mb-5 mb-xl-10'>
              <div id='kt_promotion_items_details' className='collapse show'>
                <form noValidate className='form'>
                  <div className='card-body border-top p-9'>

                    <div className='row mb-6'>
                      <label className='col-lg-12 col-form-label required fw-bold fs-6'>
                        {products[0].name} original price HKD {products[0].price}
                      </label>

                      <div className='col-lg-12 fv-row'>
                        <input
                          type='text'
                          className='form-control form-control-lg form-control-solid'
                          placeholder='Enter price'
                          value={price.documentBox}
                          onChange={(e) => {setPrice({...price, documentBox: e.target.value})}}
                        />
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-12 col-form-label required fw-bold fs-6'>
                        {products[1].name} original price HKD {products[1].price}
                      </label>

                      <div className='col-lg-12 fv-row'>
                        <input
                          type='text'
                          className='form-control form-control-lg form-control-solid'
                          placeholder='Enter price'
                          value={price.overisizeBox}
                          onChange={(e) => {setPrice({...price, overisizeBox: e.target.value})}}
                        />
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-12 col-form-label required fw-bold fs-6'>
                        {products[2].name} original price HKD {products[2].price}
                      </label>

                      <div className='col-lg-12 fv-row'>
                        <input
                          type='text'
                          className='form-control form-control-lg form-control-solid'
                          placeholder='Enter price'
                          value={price.wardrobeBox}
                          onChange={(e) => {setPrice({...price, wardrobeBox: e.target.value})}}
                        />
                      </div>
                    </div>

                    <div className='row mb-6'>
                      <label className='col-lg-12 col-form-label required fw-bold fs-6'>
                        {products[3].name} original price HKD {products[3].price}
                      </label>

                      <div className='col-lg-12 fv-row'>
                        <input
                          type='text'
                          className='form-control form-control-lg form-control-solid'
                          placeholder='Enter price'
                          value={price.packageBox}
                          onChange={(e) => {setPrice({...price, packageBox: e.target.value})}}
                        />
                      </div>
                    </div>

                  </div>

                  <div className='card-footer d-flex justify-content-end py-6 px-9'>
                    <button type='submit' onClick={submitPromotionItem} className='btn btn-primary' disabled={loading}>
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
          </div>
        </div>
      </div>
    </>
  )
}