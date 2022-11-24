import { useState, useEffect } from "react";


const OrderRow = (props) => {
  const { order, index } = props;
  const [orderStatus, setOrderStatus] = useState();
  useEffect(() => {
    switch (order.order_status_id) {
      case 1:
        return setOrderStatus('New');
      case 4:
        return setOrderStatus('In Progress');
      case 16:
        return setOrderStatus('Check-in');
      case 28:
        return setOrderStatus('Completed');
      default:
        return setOrderStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <tr id={index}>
      <td>
        <a href='#/' className='text-dark fw-bold text-primary text-underline fs-5'>
          {order.code} 
        </a>
      </td>
      <td>
        <span className='badge badge-light-success'>{orderStatus}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block mb-1 fs-5'>
          {order.created_at}
        </span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block mb-1 fs-5'>
          {order.checkin_date_other}
        </span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block mb-1 fs-5'>
          {order.checkout_date_other}
        </span>
      </td>
      <td className='text-dark fw-bold  fs-5'>{order.total_fee}</td>
      <td className='text-dark fw-bold fs-5'>{order.total_fee - order.paid_fee}</td>
      <td className='text-dark fw-bold fs-5'>qrqrqrqrrqr</td>
    </tr>
  )
}

export default OrderRow