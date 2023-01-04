import { useState, FC, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { signup } from "../../../store/apis/auth";
import CssTextField from "../../../components/custom-components/TextField";
import { ShowNotification } from "../../../components/notification";


type Props = {
  returnHandler?: Function,
  stuffInfo?: {
    name: String,
  },
  accountInfo?: Object,
}

const SignUp: FC<Props> = (props) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState<String>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [contact, setContact] = useState<string>('');
    const [notify, setNotify] = useState({ title: '', message: '', visible: false, status: 0 });

    const onSignUpFunc = () => {
        // if (email === "" || email === undefined) {
        //     console.log("please input email");
        //     setNotify({ title: 'warning', message: "common.no-input-email", visible: true, status: Math.floor(Math.random() * 100000) });
        //     return;
        // }
        if (email === "") {
            setNotify({ title: 'warning', message: "common.no-input-email", visible: true, status: Math.floor(Math.random() * 100000) });
            return;
        } else {
            let __email = email;
            let __re = /\S+@\S+\.\S+/;
            let __result = __email.match(__re);
            if(__result == null) {
                setNotify({ title: 'warning', message: "common.no-input-email-validate", visible: true, status: Math.floor(Math.random() * 100000) });
                return;
            }
        }
        if(email.length > 100) {
            setNotify({ title: 'warning', message: "common.no-input-email-length", visible: true, status: Math.floor(Math.random() * 100000) });
            return;
        }
        if (name === "") {
            console.log("please input name");
            setNotify({ title: 'warning', message: "common.no-input-name", visible: true, status: Math.floor(Math.random() * 100000) });
            return;
        }
        if(name.length > 100) {
            setNotify({ title: 'warning', message: "common.no-input-name-length", visible: true, status: Math.floor(Math.random() * 100000) });
            return;
        }
        if (contact === "") {
            setNotify({ title: 'warning', message: "common.no-input-contact", visible: true, status: Math.floor(Math.random() * 100000) });
            return;
        } else {
            let __contact = contact;
            let __re = /[^0-9]+/g;
            let __result = __contact.match(__re);
            let __length = __contact.length;
            if(__result == null && __length <= 11 && __length >= 8) {
            } else {
                setNotify({ title: 'warning', message: "common.no-input-contact-validate", visible: true, status: Math.floor(Math.random() * 100000) });
                return;
            }
        }
        if (password === "") {
            console.log("please input password");
            setNotify({ title: 'warning', message: "common.no-input-password", visible: true, status: Math.floor(Math.random() * 100000) });
            return;
        }
        if (password.length > 16 || password.length < 8) {
            setNotify({ title: 'warning', message: "common.no-input-password-length", visible: true, status: Math.floor(Math.random() * 100000) });
            return;
        }
        signup({
            email,
            password,
            name,
            contact,
        }).then((res) => {
            if (res.data.status === "success") {
                localStorage.setItem("ubox-user", JSON.stringify(res.data.user));
                localStorage.setItem("ubox-is-authenticated", '1');
                // returnHandler(true);
                setNotify({ title: 'success', message: "common.no-signup-success", visible: true, status: Math.floor(Math.random() * 100000) });
                window.location.replace('/client/dashboard');
            } else {
                localStorage.removeItem('ubox-user');
                localStorage.setItem("ubox-is-authenticated", '0');
                // returnHandler(false);                
                setNotify({ title: 'error', message: "common.no-signup-failed", visible: true, status: Math.floor(Math.random() * 100000) });
            }
        }).catch((err) => {
            localStorage.removeItem('ubox-user');
            localStorage.setItem("ubox-is-authenticated", '0');
            // returnHandler(false);
            console.log(err);
            setNotify({ title: 'error', message: "common.no-signup-failed", visible: true, status: Math.floor(Math.random() * 100000) });
        }).finally(() => {

        });
    }

    const closeNotify = () => {
        setNotify({
            ...notify,
            visible: false,
        });
    }

    const keyEnter = useCallback((event:any) => {
        if (event.key === "Enter") {
          document.getElementById("submit_client_signup")?.click();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
    useEffect(() => {
    document.addEventListener('keydown', keyEnter, false);
    return () => {
        document.removeEventListener('keydown', keyEnter, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <ShowNotification title={notify.title} message={notify.message} visible={notify.visible} status={notify.status} closeNotify={closeNotify} />
            <div className="w-[100%] pl-[32px] pr-[32px]">
                <div className="mb-[10px]">
                    <CssTextField
                        required fullWidth
                        id="email"
                        label={t("common.wd-email")}
                        // placeholder={t("common.wd-email")}
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
                        // placeholder={t("common.wd-password")}
                        variant="standard"
                        inputProps={{
                            autoComplete: "new-password"
                         }}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </div>
                <div className="mt-[10px] mb-[10px]">
                    <CssTextField
                        required fullWidth
                        id="name"
                        label={t("common.wd-name")}
                        // placeholder={t("common.wd-name")}
                        variant="standard"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </div>
                <div className="mt-[10px] mb-[10px]">
                    <CssTextField
                        required fullWidth
                        id="contact"
                        label={t("common.wd-contact")}
                        // placeholder={t("common.wd-contact")}
                        variant="standard"
                        value={contact}
                        onChange={(e) => { setContact(e.target.value) }}
                    />
                </div>
            </div>
            <div className="flex item-center mt-[40px] mb-[10px]"><span id="submit_client_signup" className="custom-btn hand text-normal-18" onClick={onSignUpFunc}>{t("common.wd-signup")}</span></div>
        </>
    )
}

export default SignUp;