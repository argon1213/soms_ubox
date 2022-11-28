/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { useTranslation } from "react-i18next";
import OrdersList from "./components/OrdersList";



const ClientPortal = (props) => {
  const user = useSelector((state) => state.client.client);
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if(user.orders !== undefined) {
      let __orders = user?.orders;
      setOrders(__orders);
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])


  return (
    <div className="content-container">
      <div className="content-page">
        <div className="flex justify-content-between align-items-center mt-[30px] mr-[20px]">
          <span className="text-header text-black pr-[10px]">{t("common.wd-my-orders")}</span>
          <Link to="/" className="btn hand">{t("common.wd-new-boxes")}</Link>
        </div>
        <OrdersList className='mb-5 mb-xl-8' orders={orders} />
      </div>
    </div>
  )
}

export default ClientPortal

