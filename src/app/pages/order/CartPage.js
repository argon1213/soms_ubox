import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { promoCodeValidate } from "../../store/apis/ordering";
import { StepType } from "../../constants/step-type";

export default function CartPage(props) {

    const { setPromotionPrice, step } = props;
    const { t, i18n } = useTranslation();
    const [promoStatus, setPromoStatus] = useState(false);
    const [promoCorrectStatus, setPromoCorrectStatus] = useState(false);
    const [validateStatus, setValidateStatus] = useState(false);

    const onPromoHandler = () => {
        if (step !== StepType.SUCCESS) {
            setPromoStatus(true);
        }
    }

    const onPromoCodeHandler = (e) => {
        promoCodeValidate({ promotion_code: e.target.value })
            .then((res) => {
                setPromoCorrectStatus(true);
                setValidateStatus(false);
                setPromotionPrice(res.data.data.items, res.data.data.id);
            })
            .catch((err) => {
                setPromoCorrectStatus(false);
                setValidateStatus(true);
            })
    }

    return (
        <div className="cart-container">
            <div className="content">
                <div className="mb-[29px]">
                    {props.step === StepType.SUCCESS ? (
                        <span className="text-header text-black">{t("cart.no-order-summary")}</span>
                    ) : (
                        <span className="text-header text-black">{t("cart.no-upfront")}</span>
                    )}
                </div>
                <div>
                    <span className="text-header text-black">{t("cart.no-storage-month")}</span>
                </div>
                <div>
                    {
                        props.carts && props.carts.stores && Object.keys(props.carts.stores).map((iter, index) => {
                            const item = props.carts.stores[iter];
                            if (item.count === 0)
                                return <div key={index}></div>;
                            return (
                                <div className="flex space-between mt-[20px]" key={index}>
                                    <div>
                                        <div className="text-normal text-black">{item.count} x {i18n.language === "zh" ? item.name_cn : item.name}</div>
                                        <div className="text-normal text-black">${item.price} {t("cart.no-per-box")}</div>
                                    </div>
                                    <div className="my-auto">
                                        <span className="text-normal text-black">${Math.round(item.count * parseFloat(item.price) * 100) / 100}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="space-line mt-[20px] mb-[20px]">
                    </div>
                    <div className="flex space-between">
                        <span className="text-header text-black">{t("common.wd-subtotal")}</span>
                        <span className="text-header text-black">${props.carts.stores_total}</span>
                    </div>
                    {
                        promoStatus ?
                            <div>
                                <div className="flex justify-content-end align-items-center mt-[15px]">
                                    {
                                        promoCorrectStatus ?
                                            <span className="text-normal text-black pr-[10px]">{t("common.wd-used-promo")}</span> :
                                            <span className="text-normal text-black pr-[10px]">{t("common.wd-enter-promo")}</span>
                                    }
                                    <Input
                                        style={{ width: '120px', border: 'none', textAlign: "center" }}
                                        onBlur={onPromoCodeHandler}
                                        disabled={promoCorrectStatus ? true : false}
                                        className={promoCorrectStatus ? "bg-secondary text-normal text-black" : "text-normal text-black"}
                                    />
                                </div>
                                {
                                    validateStatus &&
                                    <div className="flex justify-content-end align-items-center my-[10px]">
                                        <span className="text-red">{t("common.wd-promo-validate")}</span>
                                    </div>
                                }
                            </div> :
                            <div className="flex justify-content-end align-items-center my-[15px]">
                                <span className="text-normal text-black pr-[10px]">{t("common.wd-promo-question")}</span>
                                <Button shape="circle" className="plusIcon" icon={<PlusOutlined style={{ display: 'block' }} />} onClick={onPromoHandler} />
                            </div>
                    }

                </div>
                {props.carts && props.carts.materials_total > 0 && (
                    <>
                        <div className="mt-[24px]">
                            <span className="text-header text-black">{t("cart.no-packing-material")}</span>
                        </div>
                        <div>
                            {
                                props.carts && props.carts.materials && Object.keys(props.carts.materials).map((iter, index) => {
                                    const item = props.carts.materials[iter];
                                    if (item.count === 0)
                                        return <div key={index}></div>;
                                    return (
                                        <div className="flex space-between mt-[20px]" key={index}>
                                            <div>
                                                <div className="text-normal text-black">{item.count} x {i18n.language === "zh" ? item.name_cn : item.name}</div>
                                                <div className="text-normal text-black">${item.price} {t("cart.no-per-box")}</div>
                                            </div>
                                            <div className="my-auto">
                                                <span className="text-normal text-black">${item.count * item.price}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                )}
                <div className="space-line mt-[20px] mb-[20px]"></div>
                <div className="flex space-between">
                    <span>
                        <span className="text-header text-black">{t("common.wd-total")}</span>
                        <span className="text-normal text-black"> ({props.carts.storage_month} {t("common.wd-months")})</span>
                    </span>
                    <span className="text-header text-black">${props.carts ? props.carts.total : 0}</span>
                </div>
            </div>
            <div className="note">
                <div className="text-normal text-black">{t("cart.no-cancel-notice")}</div>
            </div>
        </div>
    )
}