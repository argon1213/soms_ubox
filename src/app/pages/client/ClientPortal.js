/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import OrdersList from "./components/OrdersList";

const ClientPortal = (props) => {
  const { t } = useTranslation();

  return (
    <div className="content-container">
      <div className="content-page">
        <div className="flex justify-content-between align-items-center mt-[30px] mb-[10px] mr-[20px]">
          <span className="text-header text-black pr-[10px]">{t("common.wd-my-orders")}</span>
          <Link to="/" className="custom-btn hand">{t("common.wd-new-boxes")}</Link>
        </div>
        <OrdersList className='mb-xl-8'/>
      </div>
    </div>
  )
}

export default ClientPortal

