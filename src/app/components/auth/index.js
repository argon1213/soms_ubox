import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { t } from "i18next";

const Sign = (props) => {
    const { stuffInfo, accountInfo } = props;
    const [tabIndex, setTabIndex] = useState(0);
    // const [isLoggedIn, setIsLoggedIn] = useState(flase);
    const onChnageTab = (index) => {
        let __isLoggedIn = localStorage.getItem('ubox-is-authenticated') ? JSON.parse(localStorage.getItem('ubox-is-authenticated')) : 0;
        if( __isLoggedIn === 0) {
            setTabIndex(index);
        }
    }

    return (
        <div className="sign w-[100%]">
            <div className="flex p-[32px]">
                <div className={`${tabIndex === 0 ? "active":"" } tab hand text-normal-18`} onClick={(e) => { onChnageTab(0) }}>{t("common.wd-signup")}</div>
                <div className={`${tabIndex === 1 ? "active":"" } tab hand text-normal-18`} onClick={(e) => { onChnageTab(1) }}>{t("common.wd-signin")}</div>
            </div>
            <div>
                {tabIndex === 0 && (<SignUp returnHandler={props.onReturnFunc} stuffInfo={stuffInfo} accountInfo={accountInfo} />)}
                {tabIndex === 1 && (<SignIn returnHandler={props.onReturnFunc} stuffInfo={stuffInfo} />)}
            </div>
       </div>

    )
}

export default Sign;