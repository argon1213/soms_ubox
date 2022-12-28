import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useListView } from '../../core/PeriodsListViewProvider'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { editPeriodItemApi } from '../../../../../store/apis/admin'
import { RootState } from '../../../../../store/reducers'

export const StoragePeriodsEditModalFormWrapper = () => {

  const { itemIdForEdit, setItemIdForEdit, data, fetchPeriodsFunc } = useListView();
  const products = useSelector((state:RootState) => state.admin.products);
  const [price, setPrice] = useState({
    documentBox: "",
    overisizeBox: "",
    wardrobeBox: "",
    packageBox: "",
  });

  useEffect(() => {
    if(data.length > 0 && itemIdForEdit !== undefined) {
      let items = data[itemIdForEdit].items;
      let __documentBox = "";
      let __overisizeBox = "";
      let __wardrobeBox = "";
      let __packageBox = "";

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
  }, [data, itemIdForEdit]);

  const profileDetailsSchema = Yup.object().shape({

  });


  const initialValues = {};

  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues,
    validationSchema: profileDetailsSchema,
    onSubmit: (values) => {
      setLoading(true);
      editPeriodItemApi({data: price, id: (itemIdForEdit !== undefined) ? data[itemIdForEdit].id : ""})
        .then((res) => {
          setLoading(false);
          fetchPeriodsFunc();
          setItemIdForEdit(undefined);
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