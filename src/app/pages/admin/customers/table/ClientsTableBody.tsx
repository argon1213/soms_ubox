import { Link } from "react-router-dom";
import { KTSVG } from "../../../../../_metronic/helpers"
import { useClientsListView } from "../core/ClientsListViewProvider";

export const ClientsTableBody = (props: any) => {

  const {listData, setListData} = props;
  const { setItemIdForUpdate, setItemIdForDelete } = useClientsListView();

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
                    {data.name}
                  </span>
                </div>
              </td>
              <td>
                <span className='text-dark fw-bold d-block fs-6'>
                  {data.email}
                </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.contact}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.address1}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.wechat}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.student_id}
                  </span>
              </td>
              <td className='text-center'>
                  <Link 
                    className='text-blue fw-bold d-block fs-6' 
                    style={{cursor: 'pointer'}}
                    to={"/admin/orders/90/" + data.name}
                  >
                    {data.orderCount}
                  </Link>
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