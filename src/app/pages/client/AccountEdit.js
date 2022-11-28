/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import CssTextField from "../../components/custom-components/TextField";
import { ShowNotification } from "../../components/notification";
import { changePasswordApi } from "../../store/apis/client";
import { useSelector } from "react-redux/es/exports";
import { updateAccount } from "../../store/actions/client";
import { useDispatch } from "react-redux";

const AccountEdit = () => {
  const user = useSelector((state) => state.client.client);
  const universities = useSelector((state) => state.client.products.universities);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // const user = JSON.parse(localStorage.getItem("ubox-user"));
  const [notify, setNotify] = useState({ title: '', message: '', visible: false, status: 0 });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [university, setUniversity] = useState("");
  const [studentId, setStudentId] = useState("");
  const [wechatId, setWechatId] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setContact(user.contact);
    setStudentId(user.student_id ? user.student_id : "");
    setWechatId(user.wechat ? user.wechat : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

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


  const onNotification = ({title, message, visible, status}) => {
    setNotify({ title, message, visible, status});
  }
  const closeNotify = () => {
    setNotify({
        ...notify,
        visible: false,
    });
  }

  const accountUpdateSubmit = () => {
    let data = {
      id: user.id,
      name: name,
      contact: contact,
      university_id: university,
      student_id: studentId,
      wechat: wechatId,
    }
    dispatch(updateAccount(data));
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  const submitHandler = () => {
    if (name === "") {
      onNotification({ title: 'warning', message: "common.no-input-name", visible: true, status: Math.floor(Math.random() * 100000) });
      return;
    }
    if (contact === "") {
      onNotification({ title: 'warning', message: "common.no-input-contact", visible: true, status: Math.floor(Math.random() * 100000) });
      return;
    } else {
      let __contact = contact;
      let __re = /[^0-9]+/g;
      let __result = __contact.match(__re);
      let __length = __contact.length;
      if(__result == null && __length === 8) {
      } else {
          onNotification({ title: 'warning', message: "common.no-input-contact-validate", visible: true, status: Math.floor(Math.random() * 100000) });
          return;
      }
    }
    if(currentPassword === ""){
      if(newPassword === "" && confirmPassword === "") {
        accountUpdateSubmit();
      } else {
        onNotification({ title: 'warning', message: "common.no-input-password-validate", visible: true, status: Math.floor(Math.random() * 100000) });
        return;
      }
    } else {
      if(newPassword === "" && confirmPassword === "") {
        onNotification({ title: 'warning', message: "common.no-input-empty-password-validate", visible: true, status: Math.floor(Math.random() * 100000) });
        return;
      } else if(newPassword !== confirmPassword) {
        onNotification({ title: 'warning', message: "common.no-input-new-password-validate", visible: true, status: Math.floor(Math.random() * 100000) });
        return;
      } else {
        let passwordData = {
          id: user.id,
          email: user.email,
          password: currentPassword,
          password_new: newPassword,
        };
        changePasswordApi(passwordData)
          .then((res) => {
            if(res.data.status === "success") {
              accountUpdateSubmit();
            } else if(res.data.status === "error") {
              onNotification({ title: 'warning', message: "common.no-input-current-password-validate", visible: true, status: Math.floor(Math.random() * 100000) });
              return;
            }
          })
      }
    }
    
  }

  return (
  <>
    <ShowNotification title={notify.title} message={notify.message} visible={notify.visible} status={notify.status} closeNotify={closeNotify} />
    <div className="content-container">
      <div className="content-page">
        <div className="text-header text-black mt-[40px]">{t("common.wd-account-details")}</div>
        <div className="mt-[20px] mx-[-15px]">
          <Grid container className="">
            <Grid item xs={12} sm={12} md={6} className="p-[15px]">
              <CssTextField
                required fullWidth
                id="standard-required-email"
                label={t("common.wd-email")}
                variant="standard"
                value={email}
                disabled
                type="email"
              />
            </Grid>
          </Grid>
          <Grid container className="">
            <Grid item xs={12} sm={12} md={6} className="p-[15px]">
              <CssTextField
                required fullWidth
                id="standard-required-name"
                label={t("common.wd-name")}
                variant="standard"
                value={name}
                onChange={(e) => {
                  let __name = e.target.value;
                  setName(__name);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} className="p-[15px]">
              <CssTextField
                required fullWidth
                id="standard-required-contact"
                label={t("common.wd-contact")}
                variant="standard"
                value={contact}
                onChange={(e) => {
                  let __contact = e.target.value;
                  setContact(__contact);
                }}
                onBlur={(e) => {
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
          <Grid container className="">
            <Grid item xs={12} sm={12} md={6} className="p-[15px]">
              <CssTextField
                required fullWidth
                id="standard-required-university"
                label={t("common.wd-customer-type")}
                variant="standard"
                value={university}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} className="p-[15px]">
              <CssTextField
                fullWidth
                id="standard-student-id"
                label={t("common.wd-student-id")}
                variant="standard"
                value={studentId}
                onChange={(e) => {
                  let __studentId = e.target.value;
                  setStudentId(__studentId);
                }}
              />
            </Grid>
          </Grid>
          <Grid container className="">
            <Grid item xs={12} sm={12} md={6} className="p-[15px]">
              <CssTextField
                fullWidth
                id="standard-wechat-id"
                label={t("common.wd-wechat-id")}
                variant="standard"
                value={wechatId}
                onChange={(e) => {
                  let __wechatId = e.target.value;
                  setWechatId(__wechatId);
                }}
              />
            </Grid>
          </Grid>
        </div>
        <div className="text-header text-black mt-[40px]">{t("common.wd-password-change")}</div>
        <div className="mt-[15px] mx-[-15px]">
          <Grid container className="">
            <Grid item xs={12} sm={12} md={6} className="p-[15px]">
              <CssTextField
                fullWidth
                id="current-password"
                type="password"
                label={t("common.wd-current-password")}
                placeholder={t("common.wd-password")}
                variant="standard"
                value={currentPassword}
                onChange={(e) => {
                  let __currentPassword = e.target.value;
                  setCurrentPassword(__currentPassword);
                }}
              />
            </Grid>
          </Grid>
          <Grid container className="">
            <Grid item xs={12} sm={12} md={6} className="p-[15px]">
              <CssTextField
                fullWidth
                id="new-password"
                type="password"
                label={t("common.wd-new-password")}
                placeholder={t("common.wd-password")}
                variant="standard"
                value={newPassword}
                onChange={(e) => {
                  let __newPassword = e.target.value;
                  setNewPassword(__newPassword);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} className="p-[15px]">
              <CssTextField
                fullWidth
                id="confirm-password"
                type="password"
                label={t("common.wd-confirm-new-password")}
                placeholder={t("common.wd-password")}
                variant="standard"
                value={confirmPassword}
                onChange={(e) => {
                  let __confirmPassword = e.target.value;
                  setConfirmPassword(__confirmPassword);
                }}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="flex item-center mt-[30px]">
        <span className="btn hand" onClick={submitHandler}>{t("common.wd-change")}</span>
      </div>
    </div>
  </>
  )
}

export default AccountEdit

