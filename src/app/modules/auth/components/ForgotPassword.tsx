import { useState, useEffect, useCallback } from 'react';
import Header from "../../../components/layout/Header";
import CssTextField from '../../../components/custom-components/TextField';
import { useTranslation } from 'react-i18next'
import { ShowNotification } from '../../../components/notification';
import { SendEmailforgotPassword, SendCodeResetPassword } from '../../../store/apis/client';
import LoadingSpinner from '../../../components/loading-spinner';

export function ForgotPassword() {
  const { t } = useTranslation();
  const [logged, setLogged] = useState<Number>(0);
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [resetStatus, setResetStatus] = useState<boolean>(false);
  const [notify, setNotify] = useState({ title: '', message: '', visible: false, status: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);
  const [emailLetter, setEmailLetter] = useState("");

  useEffect(() => {
    let __logged: String | any = localStorage.getItem("ubox-is-authenticated");
    setLogged(parseInt(__logged));
  }, [])

  const closeNotify = () => {
    setNotify({
        ...notify,
        visible: false,
    });
  }

  const onSubmitEmail = () => {
    if (email === "" || email === undefined) {
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
    setIsLoading(true);
    SendEmailforgotPassword({email: email})
      .then((res) => {
        if(res.data.status === "success") {
          setResetStatus(true);
        }
        setIsLoading(false);
        getEmailLetter();
      })
      .catch((res) => {
        setNotify({ title: 'warning', message: "common.no-input-email-registered", visible: true, status: Math.floor(Math.random() * 100000) });
        setIsLoading(false);
      })
  }

  const onSubmitCode = () => {
    if(code === "") {
      setNotify({ title: 'warning', message: "common.wd-enter-code", visible: true, status: Math.floor(Math.random() * 100000) });
      return;
    } 
    if(password === "") {
      // setNotify({ title: 'warning', message: "common.no-input-password", visible: true, status: Math.floor(Math.random() * 100000) });
      return;
    } else if(password.length > 16 || password.length < 8) {
      // setNotify({ title: 'warning', message: "common.no-input-password-length", visible: true, status: Math.floor(Math.random() * 100000) });
      return;
    }
    let __data = {
      email: email,
      otp: code,
      password: password,
    }
    setIsLoading(true);
    SendCodeResetPassword(__data)
      .then((res) => {
        setNotify({ title: 'warning', message: "common.no-success-reset-password", visible: true, status: Math.floor(Math.random() * 100000) });
        setIsLoading(false);
        window.location.href = "/client/login";
      })
      .catch((err) => {
        setNotify({ title: 'warning', message: "common.no-error-reset-password-code", visible: true, status: Math.floor(Math.random() * 100000) });
        setIsLoading(false);
      })
  }

  const getEmailLetter = () => {
    let __email = email;
    let __pos = __email.indexOf('@');
    let __letter = __email.substring(__pos - 2, __pos + 3);
    setEmailLetter(__letter);
    return __letter;
  }

  const keyEnter = useCallback((event:any) => {
    if (event.key === "Enter") {
      document.getElementById("submit_otp_code")?.click();
      document.getElementById("submit_forgetPassword_email")?.click();
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
    <div className="top-container">
      <LoadingSpinner isLoading={isLoading} />
      <ShowNotification title={notify.title} message={notify.message} visible={notify.visible} status={notify.status} closeNotify={closeNotify} />
      <Header logged={logged} />
      <div className="w-[100%] h-[100%] flex item-center item-vcenter">
        <div className="cmodal-content flex item-center my-auto">
          <div className="sign w-[100%] auth-login p-[32px]">
            {
              !resetStatus && 
              <>
                <div className='forgot-password-tab text-normal'>
                  {t("common.no-need-help-password")}
                </div>

                <div className='forgot-password-msg'>
                  <span className='text-yellow'>
                    {t("common.no-forgot-password-email-msg", {emailLetter: emailLetter})}
                  </span>
                </div>

                <div className='mt-[20px]'>
                  <CssTextField 
                    required fullWidth
                    id="email"
                    label={t("common.wd-email")}
                    variant="standard"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                  />
                </div>
                <div className="flex item-center mt-[50px] mb-[40px]"><span id="submit_forgetPassword_email" className="custom-btn hand text-normal-18" onClick={onSubmitEmail} >{t("common.wd-submit")}</span></div>
              </>
            }
            {
              resetStatus && 
              <>
                <div className='forgot-password-tab text-normal'>
                  {t("common.wd-enter-code")}
                </div>

                <div className='forgot-password-msg'>
                  <span className='text-yellow'>
                    {t("common.no-forgot-password-code-msg", {emailLetter: emailLetter})}
                  </span>
                </div>

                <div className='mt-[20px]'>
                  <CssTextField 
                    required fullWidth
                    id="code"
                    label={t("common.wd-code")}
                    variant="standard"
                    value={code}
                    onChange={(e) => { setCode(e.target.value) }}
                  />
                </div>
                <div className="mt-[10px] mb-[10px]" style={{position: 'relative'}}>
                  <CssTextField
                    required fullWidth
                    id="reset-password"
                    type="password"
                    label={t("common.wd-password")}
                    variant="standard"
                    inputProps={{
                      autoComplete: 'new-password',
                    }}
                    value={password}
                    onChange={(e) => { 
                      setPassword(e.target.value); 
                      let __password = e.target.value;
                      if(__password.length > 16 || __password.length < 8) {
                      } else {
                        setValidatePassword(false);
                      }
                    }}
                    onBlur={(e) => {
                      let __password = e.target.value;
                      if(__password.length > 16 || __password.length < 8) {
                        setValidatePassword(true);
                      } else {
                        setValidatePassword(false);
                      }
                    }}  
                  />
                  {
                    validatePassword &&
                    <div className='py-1' style={{position: 'absolute', bottom: '-20px'}}>
                      <span className='text-red'>{t("common.no-input-password-length")}</span>
                    </div>
                  }
                </div>
                <div className="flex item-center mt-[50px] mb-[40px]"><span id="submit_otp_code" className="custom-btn hand text-normal-18" onClick={onSubmitCode} >{t("common.wd-submit")}</span></div>
                
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
