import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Grid, RadioGroup } from '@mui/material';
import CustomColorRadio from "../components/customColor/radio-button";
import CssFormControlLabel from "../components/customColor/formControlLabel";
import CssTextField from "../components/customColor/text-field";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/payment";
import { orderSubmit } from "../apis/ordering";
import LoadingSpinner from "../components/loading-spinner";

export default function ContentPage5(props) {
    const { onNotification, cartInfo, setCartInfo, stuffInfo, accountInfo } = props;
    const [paymentType, setPaymentType] = useState('3');
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    const __carts = cartInfo;
    const __duration = cartInfo.storage_month;
    const __payment_type = cartInfo.payment_type;
    const __stuff_info = stuffInfo;
    const __account_info = accountInfo;
    const __user_info = JSON.parse(localStorage.getItem("ubox-user"));
    
    const getStripe = () => {
        const stripeKey = process.env.REACT_APP_STRIPE_KEY;
        const stripePromise = loadStripe(stripeKey); 
        console.log(typeof stripeKey, stripeKey);

        return stripePromise;
    }
    const handleRadioChange = (event) => {
        setPaymentType(event.target.value);
        setCartInfo(event.target.value);
    };

    const onNextHandler = (e) => {
        if(paymentType === '3') {
            document.querySelector('form').requestSubmit();
            setIsLoading(true);
        }
    }

    useEffect(() => {
        if(paymentType === '4' || paymentType === '5') {
            // setTimeout(() => {
            //     yedpayOrderSubmit({
            //         carts: { ...__carts, duration: __duration, payment_type: paymentType },
            //         stuff: __stuff_info,
            //         account: __account_info,
            //         somsclient_id: __user_info.id,
            //     })
            // }, 3000);
        }
    }, [paymentType]);

    const onCallbackFunc = (error, token) => {
        
        setIsLoading(false);
        if (!error) {
            // Backend is not implemented yet, but once there isn’t any errors,
            // you can pass the token and payment data to the backend to complete
            // the charge
            setIsLoading(true);
            orderSubmit({
                stripeToken: token.id,
                carts: { ...__carts, duration: __duration, payment_type: __payment_type },
                stuff: {
                    ...__stuff_info,
                },
                account: __account_info,
                somsclient_id: __user_info.id,
            }).then((res) => {
                localStorage.setItem("ubox-return", JSON.stringify({ orderNumber: res.data.order }));
                if(res.data.code === "success") {
                    onNotification({ title: res.data.code, message: res.data.message, visible: true, status: Math.floor(Math.random() * 100000) });
                    localStorage.setItem("orderState", JSON.stringify(1));
                    props.onChangeStep();
                } else {
                    console.log("responseError", res.data);
                    onNotification({ title: "error", message: "Payment Error is happened. Please check again.", visible: true, status: Math.floor(Math.random() * 100000) });
                }
            }).catch((err) => {
                console.log("errors_message", err);
                onNotification({ title: "error", message: err.data.message, visible: true, status: Math.floor(Math.random() * 100000) });
            }).finally(() => {
                setIsLoading(false);
            });
        } else {
            onNotification({ title: "error", message: error.message, visible: true, status: Math.floor(Math.random() * 100000) });
        }
    }
    return (
        <>
            <LoadingSpinner isLoading={isLoading}></LoadingSpinner>
            <div className="content-container">
                <div className="content-page">
                    <div className="text-header text-black pb-[10px]">{t("page5.qu-which-payment")}</div>
                    <div className="text-normal text-black">{t("page5.an-which-payment")}</div>
                    <div className="mt-[33px]" >
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={12}>
                                <RadioGroup
                                    aria-labelledby="payment-type-radio-buttons-group"
                                    name="radio-buttons-group"
                                    value={paymentType}
                                    onChange={handleRadioChange}
                                >
                                    <CssFormControlLabel value={3} control={<CustomColorRadio />} label="Credit Card" />
                                    <CssFormControlLabel value={4} control={<CustomColorRadio />} label="WeChat Pay" />
                                    <CssFormControlLabel value={5} control={<CustomColorRadio />} label="Alipay" />
                                    <CssFormControlLabel value={6} control={<CustomColorRadio />} label="Cash/ATM" />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                {paymentType === '3' && (
                                    <>
                                        <Elements stripe={getStripe()}>
                                            <PaymentForm onCallbackHandler={onCallbackFunc} />
                                        </Elements>
                                        <div className="mt-[17px]">
                                            <CssTextField
                                                required fullWidth
                                                id="standard-required"
                                                label={t("common.wd-card-number")}
                                                defaultValue=""
                                                variant="standard"
                                            />
                                        </div>
                                        <div className="mt-[17px]">
                                            <CssTextField
                                                fullWidth
                                                id="standard-required"
                                                label={t("common.wd-expiry-date")}
                                                defaultValue=""
                                                variant="standard"
                                            />
                                        </div>
                                        <div className="mt-[17px]">
                                            <CssTextField
                                                fullWidth
                                                id="standard-required"
                                                label="CVC"
                                                defaultValue=""
                                                variant="standard"
                                            />
                                        </div>
                                    </>
                                )}
                                {paymentType === '4' && (
                                    <div className="w-[100%] mt-[30px] flex item-center">
                                        <img src="/images/qr-code.png" alt="qr-code" width={290} height={290} />
                                    </div>
                                )}
                                {paymentType === '5' && (
                                    <div className="w-[100%] mt-[30px] flex item-center">
                                        <img src="/images/qr-code.png" alt="qr-code" width={290} height={290} />
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className="flex item-center mt-[30px]"><span className="btn hand" onClick={onNextHandler}>{t("common.wd-next")}</span></div>
            </div>
        </>
    )
}

