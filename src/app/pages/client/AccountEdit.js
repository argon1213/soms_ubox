/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import CssTextField from "../../components/custom-components/TextField";
import { ShowNotification } from "../../components/notification";

const AccountEdit = () => {
  const { t } = useTranslation();
  const [notify, setNotify] = useState({ title: '', message: '', visible: false, status: 0 });

  const onNotification = ({title, message, visible, status}) => {
    setNotify({ title, message, visible, status});
  }
  const closeNotify = () => {
    setNotify({
        ...notify,
        visible: false,
    });
  }

  return (
  <>
    <ShowNotification title={notify.title} message={notify.message} visible={notify.visible} status={notify.status} closeNotify={closeNotify} />
    <div className="content-container">
      <div className="content-page">
        <div className="text-header text-black mt-[40px]">{t("common.wd-account-details")}</div>
        <div className="mt-[20px]">
          <Grid container className="mx-[-15px]">
            <Grid item xs={12} sm={12} md={6} className="p-[15px]">
              <CssTextField
                required fullWidth
                id="standard-required"
                label={t("common.wd-email")}
                variant="standard"
                value={"Email"}
                type="email"
                onBlur={(e) => {
                    // setStuffInfo({...stuffInfo, email: e.target.value});
                    let __email = e.target.value;
                    let __re = /\S+@\S+\.\S+/;
                    let __result = __email.match(__re);
                    if(__result == null) {
                        onNotification({ title: 'warning', message: "common.no-input-email-validate", visible: true, status: Math.floor(Math.random() * 100000) });
                    }
                }}
              />
            </Grid>
          </Grid>
          <Grid container className="mx-[-15px]">
            <Grid item xs={12} sm={12} md={6} className="p-[15px]">
              <CssTextField
                required fullWidth
                id="standard-required"
                label={t("common.wd-name")}
                variant="standard"
                value={"Alan"}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} className="p-[15px]">
              <CssTextField
                required fullWidth
                id="standard-required"
                label={t("common.wd-contact")}
                variant="standard"
                value={"contact"}
                onChange={(e) => { 
                    // setContact(e.target.value);
                }}
                onBlur={(e) => {
                  // setStuffInfo({...stuffInfo, contact: (e.target.value)});
                  let __contact = e.target.value;
                  let __re = /[^0-9]+/g;
                  let __result = __contact.match(__re);
                  let __length = __contact.length;
                  if(__result == null && __length === 8) {
                  } else {
                      onNotification({ title: 'warning', message: "common.no-input-contact-validate", visible: true, status: Math.floor(Math.random() * 100000) });
                  }
                }}
              />
            </Grid>
          </Grid>
          <Grid container className="mx-[-15px]">
            <Grid item xs={12} sm={12} md={6} className="p-[15px]">
              <CssTextField
                required fullWidth
                id="standard-required"
                label={t("common.wd-customer-type")}
                variant="standard"
                value={"Customer Type"}
                onChange={(e) => { 
                    // setAddress(e.target.value);
                    // setStuffInfo({...stuffInfo, address: e.target.value});
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} className="p-[15px]">
              <CssTextField
                required fullWidth
                id="standard-required"
                label={t("common.wd-student-id")}
                variant="standard"
                value={"Student Id"}
                onChange={(e) => { 
                    // setAddress(e.target.value);
                    // setStuffInfo({...stuffInfo, address: e.target.value});
                }}
              />
            </Grid>
          </Grid>
          <Grid container className="mx-[-15px]">
            <Grid item xs={12} sm={12} md={6} className="p-[15px]">
              <CssTextField
                required fullWidth
                id="standard-required"
                label={t("common.wd-wechat-id")}
                variant="standard"
                value={"WeChat ID"}
                onChange={(e) => { 
                    // setAddress(e.target.value);
                    // setStuffInfo({...stuffInfo, address: e.target.value});
                }}
              />
            </Grid>
          </Grid>
        </div>

        <div className="text-header text-black mt-[40px]">{t("common.wd-password-change")}</div>
        <div className="mt-[15px]">
          <Grid container className="mx-[-15px]">
            <Grid item xs={12} sm={12} md={6} className="p-[15px]">
              <CssTextField
                required fullWidth
                id="standard-required"
                label={t("common.wd-current-password")}
                variant="standard"
                value={"Email"}
                type="email"
                onBlur={(e) => {
                    // setStuffInfo({...stuffInfo, email: e.target.value});
                    let __email = e.target.value;
                    let __re = /\S+@\S+\.\S+/;
                    let __result = __email.match(__re);
                    if(__result == null) {
                        onNotification({ title: 'warning', message: "common.no-input-email-validate", visible: true, status: Math.floor(Math.random() * 100000) });
                    }
                }}
              />
            </Grid>
          </Grid>
          <Grid container className="mx-[-15px]">
            <Grid item xs={12} sm={12} md={6} className="p-[15px]">
              <CssTextField
                required fullWidth
                id="standard-required"
                label={t("common.wd-new-password")}
                variant="standard"
                value={"Alan"}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} className="p-[15px]">
              <CssTextField
                required fullWidth
                id="standard-required"
                label={t("common.wd-confirm-new-password")}
                variant="standard"
                value={"contact"}
                onChange={(e) => { 
                    // setContact(e.target.value);
                }}
                onBlur={(e) => {
                  // setStuffInfo({...stuffInfo, contact: (e.target.value)});
                  let __contact = e.target.value;
                  let __re = /[^0-9]+/g;
                  let __result = __contact.match(__re);
                  let __length = __contact.length;
                  if(__result == null && __length === 8) {
                  } else {
                      onNotification({ title: 'warning', message: "common.no-input-contact-validate", visible: true, status: Math.floor(Math.random() * 100000) });
                  }
                }}
              />
            </Grid>
          </Grid>
        </div>


      </div>
      <div className="flex item-center mt-[30px]"><span className="btn hand">{t("common.wd-change")}</span></div>
    </div>
  </>
  )
}

export default AccountEdit

