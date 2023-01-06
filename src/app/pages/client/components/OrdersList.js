/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import OrderRow from "./OrderRow";
import OrderByIcon from "./OrderByIcon";
import { fetchOrders } from "../../../store/actions/client";
import LoadingSpinner from "../../../components/loading-spinner";
import { Pagination } from "antd";


const OrdersList = ({className}) => {
  const user = JSON.parse(localStorage.getItem("ubox-user"));
  // const user = useSelector((state) => state.client.client);
  const orders = useSelector((state) => state.client.orders);
  const currentPage = useSelector((state) => state.client.page);
  const isLoading = useSelector((state)=>state.client.loading);
  const [orderByKey, setOrderByKey] = useState(0);
  const [orderByLabel, setOrderByLabel] = useState("init");
  const { t } = useTranslation();
  const [initial, setInitial] = useState(false);
  const dispatch = useDispatch();
  const perPage = 10;
  const [offset, setOffset] = useState(0);
  // const [total, setTotal] = useState(0);
  const total = useSelector((state) => state.client.total);

  useEffect(() => {
    setInitial(true);
  }, [])

  useEffect(() => {
    if(initial) {
      setOrderByKey(0);
      // setTotal(user.orderCount);
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
        return "init";
    }
    setOrderByKey(__key);
    setOrderByLabel(__label);
    dispatch(fetchOrders({
      client_id: user.id,
      label: __label,
      page: currentPage,
      offset: offset,
      limit: perPage,
      total: total,
    }));
  }

  const onChangePagination = (page) => {
    let __offset = (page - 1) * perPage;
    setOffset(__offset);
    dispatch(fetchOrders({
      client_id: user.id,
      label: orderByLabel,
      page: page,
      offset: __offset,
      limit: perPage,
      total: total,
    }));
  }

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div>
        {/* begin::Table container */}
        <div className='table-responsive min-h-[600px]'>
          {/* begin::Table */}
          <table className='table gs-7 gy-7 gx-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='text-normal fw-bold fs-5 border-bottom border-gray-500 align-middle'>
                <th className='min-w-[160px]'>
                  <span className="hand" onClick={onOrderByHandler}>
                    {t("common.wd-order-no")}
                    <span className="pr-[5px]">
                      <OrderByIcon orderByKey={orderByKey} />
                    </span>
                  </span>
                </th>
                <th className='min-w-[90px] text-center'>{t("common.wd-status")}</th>
                <th className='min-w-[120px]'>{t("common.wd-order-date")}</th>
                <th className='min-w-[140px]'>{t("common.wd-laden-return-date")}</th>
                <th className='min-w-[140px]'>{t("common.wd-tentative-retrieval-date")}</th>
                <th className='min-w-[80px]'>{t("common.wd-total-fee")}</th>
                <th className='min-w-[100px]'>{t("common.wd-outstanding-fee")}</th>
                <th className='min-w-[120px]'>{t("common.wd-payment-method")}</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {
                orders &&
                <OrderRow orders={orders} />
              }
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
        {
          (total > 10) && (
            <div className="flex justify-content-end my-[20px] pr-[20px]">
              <Pagination onChange={onChangePagination} defaultCurrent={1} current={currentPage} total={total} pageSize={10} showSizeChanger={false} />
            </div>
          )
        }
      </div>
      {/* begin::Body */}
      <LoadingSpinner isLoading={isLoading} />
    </div>
  )
}

export default OrdersList
