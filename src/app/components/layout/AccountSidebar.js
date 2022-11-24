import { useTranslation } from "react-i18next";
import AccountTextField from "../custom-components/AccountTextField";

export default function AccountSidebar(props) {
    const { t } = useTranslation();
    return (
      <div className="cart-container min-w-[210px]">
        <div className="content">
            <div className="my-[25px]">
              <span className="text-header text-black">Account Information</span>
            </div>
            <AccountTextField title={t("common.wd-name")} content={"Alan"} />
            <AccountTextField title={t("common.wd-email-address")} content={"testuser@gmail.com"} />
            <AccountTextField title={t("common.wd-mobile-no")} content={"12345678"} />
            <AccountTextField title={t("common.wd-customer-type")} content={"University"} />
            <AccountTextField title={t("common.wd-student-id")} content={"Alan"} />
            <AccountTextField title={t("common.wd-wechat-id")} content={"Alan"} />
            <div className="py-[10px]">
                <span className="text-header text-blue">{t("common.wd-my-order")}</span>
            </div>
            <div className="flex item-center my-[30px]"><span className="btn hand text-normal-18">{t("common.wd-edit")}</span></div>
          </div>
      </div>
    )
  }