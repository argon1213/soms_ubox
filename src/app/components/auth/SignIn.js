import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { login } from "../../store/apis/auth";
import CssTextField from "../custom-components/TextField";
import { ShowNotification } from "../notification";

const SignIn = (props) => {
    const { returnHandler, stuffInfo } = props;
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notify, setNotify] = useState({ title: '', message: '', visible: false, status: 0 });

    useEffect(() => {
        let __stuff_info = stuffInfo;
        setEmail(__stuff_info.email);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSignInFunc = () => {
        if (email === "" || email === undefined) {
            console.log("please input email");
            setNotify({ title: 'warning', message: "common.no-input-email", visible: true, status: Math.floor(Math.random() * 100000) });
            return;
        }
        if (email !== "") {
            let __email = email;
            let __re = /\S+@\S+\.\S+/;
            let __result = __email.match(__re);
            if(__result == null) {
                setNotify({ title: 'warning', message: "common.no-input-email-validate", visible: true, status: Math.floor(Math.random() * 100000) });
                return;
            }
        }
        if (email.length > 100) {
            setNotify({ title: 'warning', message: "common.no-input-email-length", visible: true, status: Math.floor(Math.random() * 100000) });
            return;
        }
        if (password === "" || email === undefined) {
            console.log("please input password");
            setNotify({ title: 'warning', message: "common.no-input-password", visible: true, status: Math.floor(Math.random() * 100000) });
            return;
        }
        if (password.length > 16 || password.length < 8) {
            setNotify({ title: 'warning', message: "common.no-input-password-length", visible: true, status: Math.floor(Math.random() * 100000) });
            return;
        }
        login({
            email: email,
            password: password,
        }).then((res) => {
            if (res.data.status === "success") {
                localStorage.setItem("ubox-user", JSON.stringify(res.data.user));
                localStorage.setItem("ubox-is-authenticated", 1);
                returnHandler(true);
                setNotify({ title: 'error', message: "common.no-login-success", visible: true, status: Math.floor(Math.random() * 100000) });
            } else {
                localStorage.removeItem('ubox-user');
                localStorage.setItem("ubox-is-authenticated", 0);
                returnHandler(false);                
                setNotify({ title: 'error', message: "common.no-login-failed", visible: true, status: Math.floor(Math.random() * 100000) });
            }
        }).catch((err) => {
            localStorage.removeItem('ubox-user');
            localStorage.setItem("ubox-is-authenticated", 0);
            returnHandler(false);
            console.log(err);
            setNotify({ title: 'error', message: "common.no-login-failed", visible: true, status: Math.floor(Math.random() * 100000) });
        }).finally(() => {

        });
    }

    return (
        <>
            <ShowNotification title={notify.title} message={notify.message} visible={notify.visible} status={notify.status} />
            <div className="w-[100%] pl-[32px] pr-[32px]">
                <div className="mb-[10px]">
                    <CssTextField
                        required fullWidth
                        id="email"
                        label={t("common.wd-email")}
                        placeholder={t("common.wd-email")}
                        variant="standard"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                </div>
                <div className="mt-[10px] mb-[10px]">
                    <CssTextField
                        required fullWidth
                        id="password"
                        type="password"
                        label={t("common.wd-password")}
                        placeholder={t("common.wd-password")}
                        variant="standard"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </div>
            </div>
            <div className="flex item-center mt-[10px] mb-[10px]"><span className="custom-btn hand text-normal-18" onClick={onSignInFunc}>{t("common.wd-next")}</span></div>
        </>
    )
}

export default SignIn;