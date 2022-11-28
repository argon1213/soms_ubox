import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

export default function ContentPage6(props) {
    const { order } = props;
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    useEffect(() => {
        setEmail(JSON.parse(localStorage?.getItem("ubox-user")).email);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const onDoneHandler = (e) => {
        // window.location.href = "/";
    }
    return (
        <div className="content-container thanks">
            <div className="content-page">
                <div className="text-header text-black">{t("common.wd-thank-you")}</div>
                <div className="text-normal text-black">{t("common.wd-thank-you")}</div>
                <div className="text-normal text-black mt-[110px]">{t("page6.no-paragraph1", {order: order.code, email:email})}</div>
                <div className="text-normal text-black mt-[36px]">
                    <Trans i18nKey="page6.no-paragraph2">
                        Click for your{" "}
                        <Link to={"/client/order/" + order.id}>order status.</Link>
                    </Trans>
                </div>
            </div>
            <div className="flex item-center my-[10px]"><Link to="/client/dashboard" className="btn hand" onClick={onDoneHandler}>{t("common.wd-done")}</Link></div>
        </div>
    )
}