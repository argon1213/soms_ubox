// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const OrderRow = (props) => {
  const { orders } = props;
  // const [orderStatus, setOrderStatus] = useState();
  // const [orderColor, setOrderColor] = useState();

  // useEffect(() => {
  //   switch (order.order_status_id) {
  //     case 1:
  //       setOrderStatus('New');
  //       setOrderColor("badge-secondary");
  //       return;
  //     case 4:
  //       setOrderStatus('In Progress');
  //       setOrderColor('badge-light-warning');
  //       return;
  //     case 8:
  //       setOrderStatus('Empty Delivery');
  //       setOrderColor('badge-light-warning');
  //       return;
  //     case 12:
  //       setOrderStatus('Sched Check-In');
  //       setOrderColor('badge-light-primary');
  //       return;
  //     case 16:
  //       setOrderStatus('Check-in');
  //       setOrderColor('badge-light-primary');
  //       return;
  //     case 20:
  //       setOrderStatus('Sch Check-Out');
  //       setOrderColor('badge-light-primary');
  //       return;
  //     case 24:
  //       setOrderStatus('Check-Out');
  //       setOrderColor('badge-light-primary');
  //       return;
  //     case 25:
  //       setOrderStatus('Sch Empty Return');
  //       setOrderColor('badge-light-primary');
  //       return;
  //     case 28:
  //       setOrderStatus('Completed');
  //       setOrderColor('badge-light-success');
  //       return;
  //     case 30:
  //       setOrderStatus('Hold');
  //       setOrderColor("badge-light-danger");
  //       return;
  //     case 32:
  //       setOrderStatus('Cancelled');
  //       setOrderColor("badge-light-danger");
  //       return;
  //     default:
  //       setOrderStatus();
  //       setOrderColor();
  //       return;
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const getStatus = (order) => {
    switch (order.order_status_id) {
      case 1:
        return ('New');
      case 4:
        return ('In Progress');
      case 8:
        return ('Empty Delivery');
      case 12:
        return ('Sched Check-In');
      case 16:
        return ('Check-in');
      case 20:
        return ('Sch Check-Out');
      case 24:
        return ('Check-Out');
      case 25:
        return ('Sch Empty Return');
      case 28:
        return ('Completed');
      case 30:
        return ('Hold');
      case 32:
        return ('Cancelled');
      default:
        return "";
    }
  }

  const getStatusColor = (order) => {
    switch (order.order_status_id) {
      case 1:
        return ("badge-secondary");
      case 4:
        return ('badge-light-warning');
      case 8:
        return('badge-light-warning');
      case 12:
        return ('badge-light-primary');
      case 16:
        return ('badge-light-primary');
      case 20:
        return ('badge-light-primary');
      case 24:
        return ('badge-light-primary');
      case 25:
        return ('badge-light-primary');
      case 28:
        return ('badge-light-success');
      case 30:
        return ("badge-light-danger");
      case 32:
        return ("badge-light-danger");
      default:
        return "";
    }
  }

  const dateFormat = (date, type) => {
    let newDate = new Date(date);
    let YY = newDate.getFullYear();
    let MM = newDate.getMonth() + 1;
    if(MM <= 9) MM = "0" + MM;
    let DD = newDate.getDate();
    if(DD <= 9) DD = "0" + DD;
    let HH = newDate.getHours();
    if(HH <= 9) HH = "0" + HH;
    let mm = newDate.getMinutes();
    if(mm <= 9) mm = "0" + mm;
    if(type === 1) {
      let result = DD + '/' + MM + '/' + YY + ' ' + HH + ':' + mm;
      return result;
    } else if (type === 2) {
      let result = DD + '/' + MM + '/' + YY;
      return result;
    }
  }

  return (
      (orders.length > 0) && orders.map((order, index) => {
        return (
          <tr key={index}>
            <td key={'order' + index}>
              <Link to={"/client/order/" + order.id } id={'link' + index} className='text-dark fw-bold order-no-color fs-5'>
                {order.code} 
              </Link>
            </td>
            <td key={index + '-status'}>
              <span className={'fs-7 min-w-[80px] badge ' + getStatusColor(order)} style={{display: "inline-block", lineHeight: "16px"}}>
                {getStatus(order)}
              </span>
            </td>
            <td key={index + '-create'}>
              <span className='text-dark fw-bold d-block mb-1 fs-5'>
                {dateFormat(order.created_at, 1)}
              </span>
            </td>
            <td key={index + '-checkin'}>
              <span className='text-dark fw-bold d-block mb-1 fs-5'>
                {dateFormat(order.checkin_date_other, 2)}
              </span>
            </td>
            <td key={index + '-checkout'}>
              <span className='text-dark fw-bold d-block mb-1 fs-5'>
                {dateFormat(order.checkout_date_other, 2)}
              </span>
            </td>
            <td className='text-dark fw-bold  fs-5' key={index + '-total'}>{'$' + order.total_fee}</td>
            <td className='text-dark fw-bold fs-5' key={index + '-balance'}>${order.balance}</td>
            <td className='text-dark fw-bold fs-5' key={index + '-qr'}>{order.pay_qr_code}</td>
          </tr>
        )
      }
    )
  )
}

export default OrderRow