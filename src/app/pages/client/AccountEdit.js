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
import ChangePassword from "./components/ChangePassword";
import LoadingSpinner from "../../components/loading-spinner";

const AccountEdit = () => {
  const user = useSelector((state) => state.client.client);
  const universities = useSelector((state) => state.client.products.universities);
  const isLoading = useSelector((state) => state.client.loading);
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
    if(user.name !== undefined) {
      setName(user.name);
      setEmail(user.email);
      setContact(user.contact);
      setStudentId(user.student_id ? user.student_id : "");
      setWechatId(user.wechat ? user.wechat : "");
    }
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
    dispatch(updateAccount(data))
      .then(() => {
        onNotification({ title: 'success', message: "common.no-update-account-success", visible: true, status: Math.floor(Math.random() * 100000) });
      })
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  const submitHandler = () => {
    if (name === "") {
      onNotification({ title: 'warning', message: "common.no-input-name", visible: true, status: Math.floor(Math.random() * 100000) });
      return;
    }
    if(name.length > 100) {
      onNotification({ title: 'warning', message: "common.no-input-name-length", visible: true, status: Math.floor(Math.random() * 100000) });
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
      if(__result == null && __length <= 11 && __length >= 8) {
      } else {
          onNotification({ title: 'warning', message: "common.no-input-contact-validate", visible: true, status: Math.floor(Math.random() * 100000) });
          return;
      }
    }
    if (user.university_id && studentId === "") {
      onNotification({ title: 'warning', message: "common.no-input-studentID", visible: true, status: Math.floor(Math.random() * 100000) });
      return;
    }
    if (studentId.length > 50) {
        onNotification({ title: 'warning', message: "common.no-input-studentID-validate", visible: true, status: Math.floor(Math.random() * 100000) });
        return;
    }
    if (wechatId !== "" && wechatId.length > 50) {
        onNotification({ title: 'warning', message: "common.no-input-wechatID-validate", visible: true, status: Math.floor(Math.random() * 100000) });
        return;
    }
    if(currentPassword === ""){
      if(newPassword === "" && confirmPassword === "") {
        accountUpdateSubmit();
      } else {
        onNotification({ title: 'warning', message: "common.no-input-password-validate", visible: true, status: Math.floor(Math.random() * 100000) });
        return;
      }
    } else {
      if (newPassword.length > 16 || newPassword.length < 8) {
        onNotification({ title: 'warning', message: "common.no-input-password-length", visible: true, status: Math.floor(Math.random() * 100000) });
        return;
      }
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
                  // let __contact = e.target.value;
                  // let __re = /[^0-9]+/g;
                  // let __result = __contact.match(__re);
                  // let __length = __contact.length;
                  // if(__result == null && __length === 8) {
                  // } else {
                  //     onNotification({ title: 'warning', message: "common.no-input-contact-validate", visible: true, status: Math.floor(Math.random() * 100000) });
                  // }
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
                required fullWidth
                id="standard-student-id"
                label={t("common.wd-student-id")}
                placeholder={t("common.wd-student-id")}
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
                name="wechat-id"
                id="standard-wechat-id"
                label={t("common.wd-wechat-id")}
                placeholder={t("common.wd-wechat-id")}
                variant="standard"
                value={wechatId}
                autoComplete='off'
                inputProps={{
                  autoComplete: 'off',
               }}
                onChange={(e) => {
                  let __wechatId = e.target.value;
                  setWechatId(__wechatId);
                }}
              />
            </Grid>
          </Grid>
        </div>
        <div className="text-header text-black mt-[40px]">{t("common.wd-password-change")}</div>
        <ChangePassword
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
      </div>
      <div className="flex item-center mt-[30px]">
        <span className="custom-btn hand" onClick={submitHandler}>{t("common.wd-change")}</span>
      </div>
    </div>
    <LoadingSpinner isLoading={isLoading} />
  </>
  )
}

export default AccountEdit

