import { useTranslation } from "react-i18next";

export default function CartPage(props) {
    const { t } = useTranslation();
    return (
      <div className="cart-container">
        <div className="content">
            <div className="mb-[29px]">
                {props.step === 5 ? (
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
                            return;
                        return (
                            <div className="flex space-between mt-[20px]" key={index}>
                                <div>
                                    <div className="text-normal text-black">{item.count} x {item.name}</div>
                                    <div className="text-normal text-black">${item.price} {t("cart.no-per-box")}</div>
                                </div>
                                <div className="my-auto">
                                    <span className="text-normal text-black">${item.count * item.price}</span>
                                </div>
                            </div>
                        )    
                    })
                }
                <div className="space-line mt-[20px] mb-[20px]">
                </div>
            </div>
            {props.carts && props.carts.materials_total > 0 && (
                <>
                <div className="flex space-between">
                    <span className="text-header text-black">{t("common.wd-subtotal")}</span>
                    <span className="text-header text-black">${props.carts.stores_total}</span>
                </div>
                <div className="mt-[24px]">
                    <span className="text-header text-black">{t("cart.no-packing-material")}</span>
                </div>
                <div>
                {
                    props.carts && props.carts.materials && Object.keys(props.carts.materials).map((iter, index) => {
                        const item = props.carts.materials[iter];
                        if (item.count === 0)
                            return;
                        return (
                    <div className="flex space-between mt-[20px]" key={index}>
                        <div>
                            <div className="text-normal text-black">{item.count} x {item.name}</div>
                            <div className="text-normal text-black">${item.price} {t("cart.no-per-box")}</div>
                        </div>
                        <div className="my-auto">
                            <span className="text-normal text-black">${item.count * item.price}</span>
                        </div>
                    </div>
                        )    
                    })
                }
                    <div className="space-line mt-[20px] mb-[20px]">
                    </div>                
                </div>
                </>
            )}
            <div className="flex space-between">
                <span>
                    <span className="text-header text-black">{t("common.wd-total")}</span>
                    <span className="text-normal text-black"> ({props.carts.storage_month} months)</span>
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