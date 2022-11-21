import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

export default function ContentPage6() {
    const { t } = useTranslation();
    const [orderNumber, setOrderNumber] = useState("");
    const [email, setEmail] = useState("");
    useEffect(() => {
        setOrderNumber(JSON.parse(localStorage?.getItem("ubox-return")).orderNumber);
        setEmail(JSON.parse(localStorage?.getItem("ubox-user")).email);
    }, [])
    const onDoneHandler = (e) => {
        localStorage.removeItem("ubox-carts");
        localStorage.removeItem("ubox-stuff-info");
        localStorage.removeItem("ubox-storage-duration");
        localStorage.removeItem("ubox-payment-type");
        localStorage.removeItem("ubox-account-info");
        localStorage.removeItem("ubox-storage-duration");
        window.location.href = "/";
    }
    return (
        <div className="content-container thanks">
            <div className="content-page">
                <div className="text-header text-black">{t("common.wd-thank-you")}</div>
                <div className="text-normal text-black">{t("common.wd-thank-you")}</div>
                <div className="text-normal text-black mt-[110px]">{t("page6.no-paragraph1", {order:orderNumber, email:email})}</div>
                <div className="text-normal text-black mt-[36px]">
                    <Trans i18nKey="page6.no-paragraph2">
                        Click for your{" "}
                        <a href="#">order status.</a>
                    </Trans>
                </div>
            </div>
            <div className="flex item-center my-[10px]"><span className="btn hand" onClick={onDoneHandler}>{t("common.wd-done")}</span></div>
        </div>
    )
}