import { useOrdersListView } from "../core/OrdersListViewProvider";
import { Link } from "react-router-dom";
import { sendInvoiceApi } from "../../../../store/apis/admin";
import { notification } from "antd";

export const OrdersTableBody = (props: any) => {

  const {listData, setListData} = props;
  const { setItemIdForUpdate, setClientIdForUpdate } = useOrdersListView();

  const selectHandler = (index:number, state:boolean) => {
    let __data = listData[index];
    __data.checked = state;
    setListData([
      ...listData.slice(0, index),
      __data,
      ...listData.slice(index + 1),
    ]);
  }
  const onSendInvoiceHandler = (id: number) => {
    sendInvoiceApi({id: id})
      .then(() => {
        notification.success({
          message: 'Success',
          description: 'Send Invoice successfully',
          placement: 'topRight',
          duration: 2,
        });
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Send Invoice is failed',
          placement: 'topRight',
          duration: 2,
        });
      })
  }

  return (
    <>
      {
        listData.length > 0 ?
        listData.map((data: any, index:number) => {
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
                    onClick={() => {setClientIdForUpdate(index)}}
                  >
                    {data.client?.name}
                  </span>
                </div>
              </td>
              <td>
                <span className='text-dark fw-bold d-block fs-6'>
                  {data.client?.email}
                </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.client?.contact}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.client?.wechat}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.client?.student_id}
                  </span>
              </td>
              <td className='text-center'>
                  <span 
                    className='text-blue fw-bold d-block fs-6'
                    style={{cursor: 'pointer'}}
                    onClick={() => {setItemIdForUpdate(index)}}
                  >
                    {data.code}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.paperBoxes}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.wardrobe}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.standardBoxes}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.oversizeItems}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.walkup}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.vacuumBags}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.storage_month}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.emptyout_date_other}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.checkin_date_other}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.checkout_date_other}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.client?.address1}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.special_instruction}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.total_fee}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.paid_fee}
                  </span>
              </td>
              <td className='text-center'>
                  <Link 
                    to={'/admin/payments/' + data.id}
                    className='text-blue fw-bold d-block fs-6'
                    style={{cursor: 'pointer'}}
                  >
                    {data.balance}
                  </Link>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.status.code}
                  </span>
              </td>
              <td>
                <div className='d-flex justify-content-end flex-shrink-0'>
                  {
                    parseInt(data.balance) !== 0 && 
                    <button 
                      className='btn btn-primary'
                      onClick={() => {onSendInvoiceHandler(data.id)}}
                    >
                      Send invoice
                    </button>
                  }
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