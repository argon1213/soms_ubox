import { Dispatch } from "react";
import { toAbsoluteUrl } from "../../../../../_metronic/helpers"
import { KTSVG } from "../../../../../_metronic/helpers"

// type propsData = {
//   listData: any;
//   setListData: Dispatch<any[]>;
// }

export const PeriodsTableBody = (props) => {

  const {listData, setListData} = props;

  const selectHandler = (index, state) => {
    // let __listData = listData;
    // __listData[index] = {
    //   ...__listData[index],
    //   checked: state,
    // }
    // console.log("__listData", __listData);
    // setListData(__listData);
  }

  return (
    <>
      {
        listData.length > 0 ?
        listData.map((data, index) => {
          return (
            <tr key={index}>
              <td>
                <div className='form-check form-check-sm form-check-custom form-check-solid'>
                  <input 
                    className='form-check-input widget-9-check' 
                    type='checkbox' 
                    value='1'
                    checked={data.checked} 
                    onChange={(e) => {
                      selectHandler(index, e.target.checked);
                    }}
                  />
                </div>
              </td>
              <td>
                <div className='d-flex align-items-center'>
                  <a href='#' className='text-blue fw-bold fs-6'>
                    {data.code}
                  </a>
                </div>
              </td>
              <td>
                <span className='text-dark fw-bold d-block fs-6'>
                  {data.name}
                </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.min}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.max}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.updated_at}
                  </span>
              </td>
              <td>
                <div className='d-flex justify-content-end flex-shrink-0'>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG
                      path='/media/icons/duotune/general/gen019.svg'
                      className='svg-icon-3'
                    />
                  </a>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                  </a>
                  <a
                    href='#'
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                  >
                    <KTSVG
                      path='/media/icons/duotune/general/gen027.svg'
                      className='svg-icon-3'
                    />
                  </a>
                </div>
              </td>
            </tr>
          )
        }) :
        <tr>
          <td colSpan={7}>
            <div className='d-flex text-center w-100 align-content-center justify-content-center'>
              No matching records found
            </div>
          </td>
        </tr>
      }
       
    </>
  )
}