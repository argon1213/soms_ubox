import { KTSVG } from "../../../../../_metronic/helpers"
import { usePromotionsListView } from "../core/PromotionsListViewProvider";

export const PromotionsTableBody = (props: any) => {

  const {listData, setListData} = props;
  const { setItemIdForUpdate, setItemIdForDelete } = usePromotionsListView();

  const selectHandler = (index:number, state:boolean) => {
    let __data = listData[index];
    __data.checked = state;
    setListData([
      ...listData.slice(0, index),
      __data,
      ...listData.slice(index + 1),
    ]);
  }

  return (
    <>
      {
        listData.length > 0 ?
        listData.map((data:any, index:number) => {
          return (
            <tr key={index}>
              <td>
                <div className='form-check form-check-sm form-check-custom form-check-solid'>
                  <input 
                    className='form-check-input widget-9-check' 
                    type='checkbox' 
                    checked={data.checked ? data.checked : false} 
                    onChange={(e) => {
                      selectHandler(index, e.target.checked);
                    }}
                  />
                </div>
              </td>
              <td>
                <div className='d-flex align-items-center'>
                  <span 
                    className='text-blue fw-bold fs-6'
                    style={{cursor: 'pointer'}}
                    onClick={() => {setItemIdForUpdate(index)}}
                  >
                    {data.code}
                  </span>
                </div>
              </td>
              <td>
                <span className='text-dark fw-bold d-block fs-6'>
                  {data.name}
                </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.effective_from}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.effective_to}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.updated_at}
                  </span>
              </td>
              <td>
                <div className='d-flex justify-content-end flex-shrink-0'>
                  <span
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    onClick={(e) => {setItemIdForDelete([data.id])}}
                  >
                    <KTSVG
                      path='/media/icons/duotune/general/gen027.svg'
                      className='svg-icon-3'
                    />
                  </span>
                </div>
              </td>
            </tr>
          )
        }) :
        <tr>
         <></>
        </tr>
      }
       
    </>
  )
}