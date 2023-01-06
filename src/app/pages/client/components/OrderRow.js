// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


const OrderRow = (props) => {
  const { orders } = props;
  const { t } = useTranslation();

  const getPaymentMethod = (order) => {
    if(order.payment_type_id) {
      switch(order.payment_type_id) {
        case 3:
          return (t("common.wd-credit-card"));
        case 4:
          return (t("common.wd-wechat-pay"));
        case 5:
          return (t("common.wd-alipay"));
        case 6:
          return (t("common.wd-cash/atm"));
        default:
          return "";
      }
    }
  }

  const getStatus = (order) => {
    switch (order.order_status_id) {
      case 1:
        return ('New');
      case 4:
        return ('In Progress');
      case 8:
        return ('Empty Delivery');
      case 14:
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
      case 14:
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
      let result = DD + '/' + MM + '/' + YY;
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
            <td key={index + '-status'} className='text-center'>
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
            <td className='text-dark fw-bold fs-5' >{getPaymentMethod(order)}</td>
          </tr>
        )
      }
    )
  )
}

export default OrderRow