/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, FC} from 'react'

import CssTextField from '../../../pages/components/customColor/text-field'
import { ShowNotification } from '../../../pages/components/notification'
import { useTranslation } from 'react-i18next'
import { login } from '../../../store/apis/auth'

type Props = {
  returnHandler?: Function,
  stuffInfo?: Object,
} 

const SignIn: FC<Props> = (props) => {

  const { t } = useTranslation();
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [notify, setNotify] = useState({ title: '', message: '', visible: false, status: 0 });

  const onSignInFunc = () => {
    if (email === "" || email === undefined) {
        console.log("please input email");
        setNotify({ title: 'warning', message: "common.no-input-email", visible: true, status: Math.floor(Math.random() * 100000) });
        return;
    }
    if (password === "" || email === undefined) {
        console.log("please input password");
        setNotify({ title: 'warning', message: "common.no-input-password", visible: true, status: Math.floor(Math.random() * 100000) });
        return;
    }
    login({
        email: email,
        password: password,
    }).then((res) => {
        if (res.data.status === "success") {
            localStorage.setItem("ubox-user", JSON.stringify(res.data.user));
            localStorage.setItem("ubox-is-authenticated", '1');
            // returnHandler(true);
            setNotify({ title: 'error', message: "common.no-login-success", visible: true, status: Math.floor(Math.random() * 100000) });
        } else {
            localStorage.removeItem('ubox-user');
            localStorage.setItem("ubox-is-authenticated", '0');
            // returnHandler(false);                
            setNotify({ title: 'error', message: "common.no-login-failed", visible: true, status: Math.floor(Math.random() * 100000) });
        }
    }).catch((err) => {
        localStorage.removeItem('ubox-user');
        localStorage.setItem("ubox-is-authenticated", '0');
        // returnHandler(false);
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
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
        </div>
      </div>
      <div className="flex item-center mt-[10px] mb-[10px]"><span className="btn hand text-normal-18" onClick={onSignInFunc}>{t("common.wd-next")}</span></div>
    </>
  )
}

export default SignIn;