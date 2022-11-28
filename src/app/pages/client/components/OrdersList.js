/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux/es/exports";
import OrderRow from "./OrderRow";
import OrderByIcon from "./OrderByIcon";


const OrdersList = ({className, orders}) => {
  const user = JSON.parse(localStorage.getItem("ubox-user"));
  // const user = useSelector((state) => state.client.client);
  // const orders = useSelector((state) => state.client.orders);
  const [orderByKey, setOrderByKey] = useState(0);
  const { t } = useTranslation();
  const [initial, setInitial] = useState(false);


  useEffect(() => {
    setInitial(true);
  }, [])

  useEffect(() => {
    if(initial) {
      setOrderByKey(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial])

  const onOrderByHandler = () => {
    switch (orderByKey) {
      case 0:
        return setOrderByKey(1);
      case 1:
        return setOrderByKey(2);
      case 2:
        return setOrderByKey(0);
      default:
        return "";
    }
  }

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table gs-7 gy-7 gx-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='text-normal fw-bold fs-5 border-bottom border-gray-500'>
                <th className='min-w-[160px]'>
                  <span className="hand" onClick={onOrderByHandler}>
                    {t("common.wd-order-no")}
                    <span className="pr-[5px]">
                      <OrderByIcon orderByKey={orderByKey} />
                    </span>
                  </span>
                </th>
                <th className='min-w-[90px]'>{t("common.wd-status")}</th>
                <th className='min-w-[170px]'>{t("common.wd-order-date")}</th>
                <th className='min-w-[140px]'>{t("common.wd-tentative-retrieval-date")}</th>
                <th className='min-w-[120px]'>{t("common.wd-checkout-date")}</th>
                <th className='min-w-[80px]'>{t("common.wd-total-fee")}</th>
                <th className='min-w-[100px]'>{t("common.wd-outstanding-fee")}</th>
                <th className='min-w-[120px]'>{t("common.wd-qr-code")}</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {orders.map((order, index) => {
                return (
                  <OrderRow order={order} index={index} />
                )
              })}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export default OrdersList
