/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import OrdersList from "./components/OrdersList";

const ClientPortal = (props) => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("ubox-user"));

  useEffect(() => {
    let __orders = currentUser.orders;
    setOrders(__orders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="content-container">
      <div className="content-page">
        <div className="flex justify-content-between item-vcenter mt-[30px] mr-[20px]">
          <span className="text-header text-black">{t("common.wd-my-orders")}</span>
          <span className="btn hand">{t("common.wd-new-boxes")}</span>
        </div>
        <OrdersList className='mb-5 mb-xl-8' orders={orders} />
      </div>
    </div>
  )
}

export default ClientPortal

