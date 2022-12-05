import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux/es/exports";
import AccountTextField from "../custom-components/AccountTextField";
import { Link } from "react-router-dom";

export default function AccountSidebar(props) {
  const user = useSelector((state) => state.client.client);
  const universities = useSelector((state) => state.client.products.universities);
  const [university, setUniversity] = useState("");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(universities?.length > 0 && user.university_id) {
      universities.forEach((item) => {
        if(item.id === user.university_id) {
          setUniversity(item.label);
          return;
        }
      })
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [universities, user])

    const { t } = useTranslation();
    return (
      <div className="cart-container min-w-[270px]">
        <div className="content">
            <div className="my-[25px]">
              <span className="text-header text-black">{t("common.wd-account-infomation")}</span>
            </div>
            <AccountTextField title={t("common.wd-name")} content={user.name} />
            <AccountTextField title={t("common.wd-email-address")} content={user.email} />
            <AccountTextField title={t("common.wd-mobile-no")} content={user.contact} />
            <AccountTextField title={t("common.wd-customer-type")} content={university} />
            <AccountTextField title={t("common.wd-student-id")} content={user.student_id} />
            <AccountTextField title={t("common.wd-wechat-id")} content={user.wechat} />
            <div className="py-[10px]">
                <Link to="/client/dashboard" className="text-header text-blue">{t("common.wd-my-order")}</Link>
            </div>
            <div className="flex item-center my-[30px]"><Link to="client/account" className="custom-btn hand text-normal-18">{t("common.wd-edit")}</Link></div>
          </div>
      </div>
    )
  }