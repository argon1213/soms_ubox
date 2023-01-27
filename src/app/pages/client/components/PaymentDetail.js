import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Grid, RadioGroup } from '@mui/material';
import CustomColorRadio from "../../../components/custom-components/RadioButton";
import CssFormControlLabel from "../../../components/custom-components/FormControlLabel";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../../../components/payment";
import LoadingSpinner from "../../../components/loading-spinner";
import { payConfirm } from "../../../store/apis/ordering";
import { ShowNotification } from "../../../components/notification";
import { outstandPayApi } from "../../../store/apis/client";
import ContentPage6 from "../../order/ContentPage6";

export const PaymentDetail = (props) => {
  const { orderId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [paymentType, setPaymentType] = useState(3);
  const { t } = useTranslation();
  const [paymentCode, setPaymentCode] = useState("");
  const [order, setOrder] = useState({});
  const [payStatus, setPayStatus] = useState(false);
  const [notify, setNotify] = useState({ title: '', message: '', visible: false, status: 0 });

  useEffect(() => {
    if (paymentCode !== undefined && paymentCode !== "") {
      const payConfirmTimer = setInterval(() => {
        payConfirm({ code: paymentCode })
          .then((res) => {
            if (res.data.success === true) {
              clearInterval(payConfirmTimer);
              setPayStatus(true);
            }
          })
          .catch((err) => {
            console.log('error', err);
          })
      }, 3000);
      setTimeout(() => {
        clearInterval(payConfirmTimer);
      }, 300000);
    } else {
      clearInterval();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentCode]);

  const showNotification = ({ title, message, visible, status }) => {
    setNotify({ title, message, visible, status });
  };

  const closeNotify = () => {
    setNotify({
      ...notify,
      visible: false,
    })
  };

  const getStripe = () => {
    const stripeKey = process.env.REACT_APP_STRIPE_KEY;
    const stripePromise = loadStripe(stripeKey);
    return stripePromise;
  };

  const handleRadioChange = (event) => {
    let type = parseInt(event.target.value);
    setPaymentType(type);
    setPaymentCode("");
  };

  const onNextHandler = (e) => {
    clearInterval();
    if (paymentType === 3) {
      document.querySelector('form').requestSubmit();
      setIsLoading(true);
    } else if (paymentType === 6) {
      setIsLoading(true);
      let stripeToken = "";
      orderSubmitHandler(stripeToken);
    } else {
      setIsLoading(true);
      outstandPayApi({
        stripeToken: "",
        order_id: orderId,
        payment_code: paymentCode,
        payment_type: paymentType
      }).then((res) => {
        if (res.data.success === true) {
          openCheckoutUrl(res.data.data);
          setPaymentCode(res.data.code);
          setOrder(res.data.order);
        } else {
          setPaymentCode("");
          console.log("responseError", res.data);
          showNotification({ title: "warning", message: "No connect.", visible: true, status: Math.floor(Math.random() * 100000) });
        }
      }).catch((err) => {
        console.log("errors_message", err);
        showNotification({ title: "error", message: err.data.message, visible: true, status: Math.floor(Math.random() * 100000) });
      }).finally(() => {
        setIsLoading(false);
      });
    }
  };

  const orderSubmitHandler = (stripeToken) => {
    setPaymentCode("");
    outstandPayApi({
      stripeToken: stripeToken,
      order_id: orderId,
      payment_code: paymentCode,
      payment_type: paymentType,
    }).then((res) => {
      if (res.data.code === "success") {
        showNotification({ title: res.data.code, message: res.data.message, visible: true, status: Math.floor(Math.random() * 100000) });
        setOrder(res.data.order);
        setPayStatus(true);
      } else if (res.data.code === "error") {
        console.log("responseError", res.data);
        setPaymentCode(res.data.payment_code);
        showNotification({ title: "warning", message: res.data.message, visible: true, status: Math.floor(Math.random() * 100000) });
      }
    }).catch((err) => {
      console.log("errors_message", err);
      showNotification({ title: "error", message: err.data.message, visible: true, status: Math.floor(Math.random() * 100000) });
    }).finally(() => {
      setIsLoading(false);
    })
  };

  const onCallbackFunc = (error, token) => {
    setIsLoading(false);
    if (!error) {
      // Backend is not implemented yet, but once there isn’t any errors,
      // you can pass the token and payment data to the backend to complete
      // the charge
      setIsLoading(true);
      let stripeToken = token.id;
      orderSubmitHandler(stripeToken);
    } else {
      showNotification({ title: "error", message: error.message, visible: true, status: Math.floor(Math.random() * 100000) });
    }
  };

  const openCheckoutUrl = (url) => window.open(url, '_blank')?.focus();

  return (
    <>
      {
        payStatus ?
          <ContentPage6 order={order} /> :
          <div>
            <LoadingSpinner isLoading={isLoading} />
            <ShowNotification title={notify.title} message={notify.message} visible={notify.visible} status={notify.status} closeNotify={closeNotify} />
            <div className="text-normal text-black py-[0px]">
              <span className="text-header text-black">{t("page5.qu-which-payment")}</span>
            </div>
            <div className="mt-[33px]">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12}>
                  <RadioGroup
                    aria-labelledby="payment-type-radio-buttons-group"
                    name="radio-buttons-group"
                    value={paymentType}
                    onChange={handleRadioChange}
                  >
                    <CssFormControlLabel value={3} control={<CustomColorRadio />} label={t("common.wd-credit-card")} />
                    <CssFormControlLabel value={4} control={<CustomColorRadio />} label={t("common.wd-wechat-pay")} />
                    <CssFormControlLabel value={5} control={<CustomColorRadio />} label={t("common.wd-alipay")} />
                    <CssFormControlLabel value={6} control={<CustomColorRadio />} label={t("common.wd-cash/atm")} />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <div className="flex items-center">
                    {paymentType === 3 && (
                      <div className="h-[20px] w-[100%]">
                        <Elements stripe={getStripe()}>
                          <PaymentForm onCallbackHandler={onCallbackFunc} />
                        </Elements>
                      </div>
                    )}
                    {paymentType === 4 && (
                      <div className="w-[100%] mt-[30px] flex item-center">
                      </div>
                    )}
                    {paymentType === 5 && (
                      <div className="w-[100%] mt-[30px] flex item-center">
                      </div>
                    )}
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="flex item-center mt-[60px]">
              <span className="custom-btn hand" onClick={onNextHandler}>{t("common.wd-next")}</span>
            </div>
          </div>
      }
    </>
  );
}