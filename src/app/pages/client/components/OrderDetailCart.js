import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const OrderDetailCart = (props) => {
    const { order, user, orderId } = props;
    const { t, i18n } = useTranslation();
    const [paymentMethod, setPaymentMethod] = useState("");
    const [cardName, setCardName] = useState("");
    const [payStatus, setPayStatus] = useState(true);

    useEffect(() => {
        if (order.payment_type_id) {
            switch (order.payment_type_id) {
                case 3:
                    setPaymentMethod("common.wd-credit-card");
                    break;
                case 4:
                    setPaymentMethod("common.wd-wechat-pay");
                    break;
                case 5:
                    setPaymentMethod("common.wd-alipay");
                    break;
                case 6:
                    setPaymentMethod("common.wd-cash/atm");
                    break;
                default:
                    break;
            }
            let __cardName = order.payments[0]?.trans_id;
            setCardName(__cardName);
            if (parseInt(order.balance) > 0) {
                setPayStatus(true);
            } else {
                setPayStatus(false);
            }
        }
    }, [order])

    return (
        <div className="content">
            <div className="mb-[29px]">
                <span className="text-header text-black">{t("cart.no-order-detail")}</span>
            </div>
            <div>
                <span className="text-header text-black">{t("cart.no-storage-month")}</span>
            </div>
            <div>
                {order.items?.map((item, index) => {
                    if (item.item_qty === 0) return <div key={index}></div>;
                    if (item.item_category === "box") {
                        return (
                            <div className="flex space-between mt-[20px]" key={index}>
                                <div>
                                    <div className="text-normal text-black" >{item.item_qty} x {i18n.language === "zh" ? item.item.name_cn : item.item.name}</div>
                                    <div className="text-normal text-black" >${item.item_price} {t("cart.no-per-box")}</div>
                                </div>
                                <div className="my-auto" >
                                    <span className="text-normal text-black">${Math.round(item.item_qty * item.item_price * 100) / 100}</span>
                                </div>
                            </div>
                        )
                    }
                    return <div key={index}></div>;
                })}
                <div className="space-line mt-[20px] mb-[20px]">
                </div>
            </div>
            <div className="flex space-between my-[20px]">
                <span className="text-header text-black">{t("common.wd-subtotal")}</span>
                <span className="text-header text-black">${order.product_total_fee ? order.product_total_fee : '0.00'}</span>
            </div>
            {
                order.vacuumBags !== undefined && order.vacuumBags > 0 && (
                    <div className="mt-[20px]">
                        <div>
                            <span className="text-header text-black">{t("cart.no-packing-materials")}</span>
                        </div>
                        {order.items?.map((item, index) => {
                            if (item.item_qty === 0) return <div key={index}></div>;
                            if (item.item_category === "bag") {
                                return (
                                    <div className="flex space-between mt-[20px]" key={index}>
                                        <div>
                                            <div className="text-normal text-black" >{item.item_qty} x {i18n.language === "zh" ? item.item.name_cn : item.item.name}</div>
                                            <div className="text-normal text-black" >${item.item_price} {t("cart.no-per-box")}</div>
                                        </div>
                                        <div className="my-auto">
                                            <span className="text-normal text-black">${item.item_qty * item.item_price}</span>
                                        </div>
                                    </div>
                                )
                            }
                            return <div key={index}></div>;
                        })}
                        <div className="space-line mt-[20px] mb-[20px]">
                        </div>
                    </div>
                )
            }
            <div className="flex space-between my-[20px]">
                <span>
                    <span className="text-header text-black">{t("common.wd-total")}</span>
                    <span className="text-normal text-black"> ({order.storage_month ? order.storage_month : 0} {t("common.wd-months")})</span>
                </span>
                <span className="text-header text-black">${order.total_fee ? order.total_fee : '0.00'}</span>
            </div>
            <div className="flex space-between my-[20px]">
                <span>
                    <span className="text-header text-black">{t("common.wd-paid-by", { name: user.name ? user.name : "" })}</span>
                </span>
                <span className="text-header text-black">${order.paid_fee ? order.paid_fee : '0.00'}</span>
            </div>
            <div className="flex space-between my-[20px]">
                <span>
                    <span className="text-header text-black">{t("common.wd-outstanding")}</span>
                </span>
                <span className="text-header text-black">${order.balance ? order.balance : '0.00'}</span>
            </div>
            <div className="flex space-between my-[20px]" style={{ position: 'relative' }} >
                <span>
                    <span className="text-header text-black">{t("common.wd-payment-method")}</span>
                </span>
                <span className="text-header text-black">{t(paymentMethod)}</span>
            </div>
            <div className="" style={{ position: 'relative' }} >
                <span className="text-header text-black card-name">{cardName}</span>
            </div>
            <div className="flex my-[30px] justify-content-end">
                <Link to={payStatus ? "/client/order/outstand-payment/" + orderId : "#"}>
                    <span className={payStatus ? "custom-btn hand" : "custom-btn disabled-btn"} >{t("common.wd-pay-now")}</span>
                </Link>
            </div>
            <div className="space-line mt-[20px] mb-[20px]"></div>
            <div>
                <span className="text-header text-black">{t("common.wd-qr-code")}</span>
            </div>
            <div>
                <span className="text-normal text-black">{order.remark_qrcode ? order.remark_qrcode : ""}</span>
            </div>
        </div>
    )
}