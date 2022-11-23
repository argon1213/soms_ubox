import { useTranslation } from "react-i18next";
import { Snackbar, Alert } from '@mui/material';

export function ShowNotification(props) {
  const { visible, closeNotify } = props;
  const { t } = useTranslation();
 
  return (
    <>
    {
      props.title !== '' && (
        <Snackbar
          open={visible}
          onClose={closeNotify}
        >
          <Alert className="notify" variant="filled" onClose={closeNotify} severity={`${props.title}`} sx={{ width: '100%', fontSize: "1.25rem" }}>
            {/* <AlertTitle className="notify-title">{props.title}</AlertTitle> */}
            {t(`${props.message}`)}
          </Alert>
        </Snackbar>
      )
    }
    </>
  )
}
