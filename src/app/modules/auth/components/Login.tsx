import { FC, useEffect, useState } from "react";
import Header from "../../../components/layout/Header";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { t } from "i18next";

type Props = {
  stuffInfo?: Object,
  accountInfo?: Object,
}

const Login: FC<Props> = (props) => {
    // const tabIndex: Number = 1;
    const [logged, setLogged] = useState<Number>(0);
    const [tabIndex, setTabIndex] = useState<Number>(1);

    useEffect(() => {
      let __logged: String | any = localStorage.getItem("ubox-is-authenticated");
      setLogged(parseInt(__logged));
    }, [])

    const onChnageTab = (index:any) => {
      if( logged === 0) {
          setTabIndex(index);
      }
    }

    return (
      <div className="top-container">
        <Header logged={logged} />
          <div className="w-[100%] h-[100%] flex item-center item-vcenter">
            <div className="cmodal-content flex item-center my-auto">
              <div className="sign w-[100%] auth-login">
                <div className="flex p-[32px]">
                    <div className={`${tabIndex === 1 ? "active":"" } tab hand text-normal-18`} onClick={(e) => { onChnageTab(1) }} >{t("common.wd-signin")}</div>
                    <div className={`${tabIndex === 0 ? "active":"" } tab hand text-normal-18`} onClick={(e) => { onChnageTab(0) }} >{t("common.wd-signup")}</div>
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