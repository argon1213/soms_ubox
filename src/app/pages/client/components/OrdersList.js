/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import OrderRow from "./OrderRow";
import OrderByIcon from "./OrderByIcon";
import { fetchOrders } from "../../../store/actions/client";
import LoadingSpinner from "../../../components/loading-spinner";


const OrdersList = ({className}) => {
  const user = JSON.parse(localStorage.getItem("ubox-user"));
  // const user = useSelector((state) => state.client.client);
  const orders = useSelector((state) => state.client.orders);
  const isLoading = useSelector((state)=>state.client.loading);
  const [orderByKey, setOrderByKey] = useState(0);
  const [orderByLabel, setOrderByLabel] = useState("");
  const { t } = useTranslation();
  const [initial, setInitial] = useState(false);
  const dispatch = useDispatch();

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
    let __key = 0;
    let __label = "";
    switch (orderByKey) {
      case 0:
        __key = 1;
        __label = "desc";
        break;
      case 1:
        __key = 2;
        __label = "asc";
        break;
      case 2:
        __key = 0;
        __label = "init";
        break;
      default:
        return "";
    }
    setOrderByKey(__key);
    setOrderByLabel(__label);
    dispatch(fetchOrders({
      client_id: user.id,
      label: __label,
    }));
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
              <OrderRow orders={orders} />
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
      <LoadingSpinner isLoading={isLoading} />
    </div>
  )
}

export default OrdersList
