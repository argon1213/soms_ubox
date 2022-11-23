import { FC } from "react";
import Header from "../../../pages/components/layout/header";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { t } from "i18next";

type Props = {
  stuffInfo?: Object,
  accountInfo?: Object,
}

const Login: FC<Props> = (props) => {
    const tabIndex: Number = 1;

    return (
      <div className="top-container">
        <Header />
        
          <div className="w-[100%] h-[100%] flex item-center item-vcenter">
            <div className="cmodal-content flex item-center my-auto">
              <div className="sign w-[100%] auth-login">
                <div className="flex p-[32px]">
                    <div className={`${tabIndex === 1 ? "active":"" } tab hand text-normal-18`}>{t("common.wd-signin")}</div>
                    <div className={`${tabIndex === 0 ? "active":"" } tab hand text-normal-18`}>{t("common.wd-signup")}</div>
                </div>
                <div>
                    {tabIndex === 0 && (<SignUp />)}
                    {tabIndex === 1 && (<SignIn />)}
                </div>
              </div>
            </div>
          </div>
        </div>
   
      
    )
}

export default Login;