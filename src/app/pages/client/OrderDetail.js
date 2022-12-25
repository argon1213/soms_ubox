/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import {useDispatch} from "react-redux";
import { Grid } from '@mui/material';
import { OrderDetailCart } from "./components/OrderDetailCart";
import { OrderDetailEdit } from "./components/OrderDetailEdit";
import { fetchCurrentOrder } from "../../store/actions/client";
import LoadingSpinner from "../../components/loading-spinner";

const OrderDetail = (props) => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.client.client);
  const order = useSelector((state) => state.client.currentOrder);
  const isLoading = useSelector((state) => state.client.loading);
  // const [order, setOrder] = useState({});
  const [orderStatus, setOrderStatus] = useState("");
  const { t } = useTranslation();
  const [initial, setInitial] = useState(false);

  useEffect(() => {
    setInitial(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(initial) {
      dispatch(fetchCurrentOrder({id: id}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial])

  useEffect(() => {
    if(user.orders !== undefined) {
        // let __currentOrder = user.orders?.filter((order) => (order.id) === parseInt(id));
        // setOrder(__currentOrder[0]);
        // let __order = __currentOrder[0];

      //   let __data = {
      //     id: __order.id,
      //     code: __order.code,
      //   }
      // dispatch(fetchCurrentOrder(__data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    if(order.order_status_id !== undefined) {
        getStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order])

  const getStatus = () => {
    switch (order?.order_status_id) {
        case 1:
          setOrderStatus('New');
          return;
        case 4:
          setOrderStatus('In Progress');
          return;
        case 8:
          setOrderStatus('Empty Delivery');
          return;
        case 14:
          setOrderStatus('Sched Check-In');
          return;
        case 16:
          setOrderStatus('Check-in');
          return;
        case 20:
          setOrderStatus('Sch Check-Out');
          return;
        case 24:
          setOrderStatus('Check-Out');
          return;
        case 25:
          setOrderStatus('Sch Empty Return');
          return;
        case 28:
          setOrderStatus('Completed');
          return;
        case 30:
          setOrderStatus('Hold');
          return;
        case 32:
          setOrderStatus('Cancelled');
          return;
        default:
          setOrderStatus("Unknown");
          return;
    }
  }

  const dateFormat = (date, type) => {
    if(date === "") return;
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
    <div className="content-container">
      <div className="content-page">
        <div className="flex flex-row-reverse mt-[30px] mr-[20px]">
          <Link to="/" className="custom-btn hand">{t("common.wd-new-boxes")}</Link>
        </div>
        <div className="text-normal text-black py-[20px]">
          <span>{t("oder-detail.no-title",{order: order.code ? order.code : "", date: dateFormat(order.created_at ? order.created_at : "" , 2), orderState: orderStatus})}</span>
        </div>
        <div className="mx-[-15px]">
          <Grid container className="">
            <Grid item xs={12} sm={12} md={6} className="px-[15px]">
              <OrderDetailCart order={order} user={user} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} className="px-[15px]">
              <OrderDetailEdit order={order} />
            </Grid>
          </Grid>
        </div>
      </div>
      <LoadingSpinner isLoading={isLoading} />
     </div>
  )
}

export default OrderDetail

