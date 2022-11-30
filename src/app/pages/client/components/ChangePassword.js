import CssTextField from "../../../components/custom-components/TextField";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

const ChangePassword = (props) => {
  const { t } = useTranslation();
  const { currentPassword, newPassword, confirmPassword, setCurrentPassword, setNewPassword, setConfirmPassword } = props;

  return (
    <div className="mt-[15px] mx-[-15px]">
      <Grid container className="">
        <Grid item xs={12} sm={12} md={6} className="p-[15px]">
          <CssTextField
            fullWidth
            name="current-password"
            id="current-password"
            type="password"
            label={t("common.wd-current-password")}
            placeholder={t("common.wd-current-password")}
            variant="standard"
            value={currentPassword}
            inputProps={{
              autoComplete: "new-password"
            }}
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
  )
}

export default ChangePassword