import { usePaymentsListView } from "../core/PaymentsListViewProvider";
import { paymentPaidApi, paymentCancelledApi } from "../../../../store/apis/admin";

export const PaymentsTableBody = (props: any) => {

  const {listData, setListData} = props;
  const { setClientIdForUpdate, setOrderIdForUpdate, fetchPaymentsFunc } = usePaymentsListView();

  const selectHandler = (index:number, state:boolean) => {
    let __data = listData[index];
    __data.checked = state;
    setListData([
      ...listData.slice(0, index),
      __data,
      ...listData.slice(index + 1),
    ]);
  }

  const onPaidHandler = (id: number) => {
    paymentPaidApi({id: id})
      .then(() => {
        fetchPaymentsFunc();
      })
  }

  const onMarkHandler = (id: number) => {
    paymentCancelledApi({id: id})
      .then(() => {
        fetchPaymentsFunc();
      })
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
                    // onClick={() => {setItemIdForUpdate(index)}}
                  >
                    {data.code}
                  </span>
                </div>
              </td>
              <td>
                <span 
                  className='text-blue fw-bold d-block fs-6'
                  style={{cursor: 'pointer'}}
                  onClick={() => {setClientIdForUpdate(index)}}
                >
                  {data.order?.client?.name}
                </span>
              </td>
              <td className='text-center'>
                  <span 
                    className='text-blue fw-bold d-block fs-6'
                    style={{cursor: 'pointer'}}
                    onClick={() => {setOrderIdForUpdate(index)}}
                  >
                    {data.order?.code}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.amount}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.status.description}
                  </span>
              </td>
              <td className='text-center'>
                  <span className='text-dark fw-bold d-block fs-6'>
                    {data.completed_at}
                  </span>
              </td>
              {
                !data.completed_at && 
                <td>
                  <div className='d-flex justify-content-around flex-shrink-0'>
                    <button
                      className='btn btn-success w-125px'
                      onClick={() => onPaidHandler(data.id)}
                    >
                      Mark as Paid
                    </button>
                    <button
                      className='btn btn-danger w-125px'
                      onClick={() => onMarkHandler(data.id)}
                    >
                      Mark as Cancelled
                    </button>
                  </div>
                </td>
              }
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