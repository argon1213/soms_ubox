import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import dayjs from 'dayjs';
import CssTextField from "../../../components/custom-components/TextField";
import { createTheme, Grid, MenuItem, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { updateOrder } from "../../../store/actions/client";
import LoadingSpinner from "../../../components/loading-spinner";
import { ShowNotification } from "../../../components/notification";

export const OrderDetailEdit = (props) => {
  const { order } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.client.loading);
  const [notify, setNotify] = useState({ title: '', message: '', visible: false, status: 0 });
  const [deliveryDate, setDeliveryDate] = useState();
  const [ladenReturnDate, setLadenReturnDate] = useState();
  const [tentativeDate, setTentativeDate] = useState();
  const [deliveryTimeIndex, setDeliveryTimeIndex] = useState(0);
  const [ladenReturnTimeIndex, setLadenReturnTimeIndex] = useState(0);
  const [tentativeTimeIndex, setTentativeTimeIndex] = useState(0);
  const [retrievalDate, setRetrievalDate] = useState(dayjs());
  const [retrievalTimeIndex, setRetrievalTimeIndex] = useState(0);
  const [emptyBoxReturnDate, setEmptyBoxReturnDate] = useState(dayjs());
  const [emptyBoxReturnTimeIndex, setEmptyBoxReturnTimeIndex] = useState(0);
  const [address, setAddress] = useState("");

  const [permitEdit, setPermitEdit] = useState({
    permitDelivery: true,
    permitLadenReturn: true,
    permitTentative: true,
    permitRetrieval: true,
  });

  const timelist = [
    {
      value: 0,
      label: '09:00 - 12:00',
    },
    {
      value: 1,
      label: '13:00 - 15:00',
    },
    {
      value: 2,
      label: '15:00 - 18:00',
    },
  ];

  useEffect(() => {
    if (order.emptyout_date_other !== undefined) {
      setDeliveryDate(order?.emptyout_date_other);
      setDeliveryTimeIndex(getTimeIndex(order?.emptyout_time_other));
      setLadenReturnDate(order?.checkin_date_other);
      setLadenReturnTimeIndex(getTimeIndex(order?.checkin_time_other));
      setTentativeDate(order?.checkout_date_other);
      setTentativeTimeIndex(getTimeIndex(order?.checkout_time_other));
      setEmptyBoxReturnDate(order?.storage_expired_date);
      setAddress(order.emptyout_location_other);

      getPermitEdit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order])

  const getPermitEdit = () => {
    let __permitEdit = permitEdit;

    // let today = dayjs();
    // if(dayjs(order?.checkout_date_other) < today) {
    //   __permitEdit = ({
    //     ...__permitEdit,
    //     permitDelivery: false,
    //     permitLadenReturn: false,
    //     permitTentative: false,
    //     permitRetrieval: false,
    //   });
    // } else if(dayjs(order?.checkin_date_other) < today) {
    //   __permitEdit = ({
    //     ...__permitEdit,
    //     permitDelivery: false,
    //     permitLadenReturn: false,
    //     permitTentative: true,
    //     permitRetrieval: true,
    //   });
    // } else if(dayjs(order?.emptyout_date_other) < today) {
    //   __permitEdit = ({
    //     ...__permitEdit,
    //     permitDelivery: false,
    //     permitLadenReturn: true,
    //     permitTentative: true,
    //     permitRetrieval: false,
    //   });
    // } else if(dayjs(order?.emptyout_date_other) > today) {
    //   __permitEdit = ({
    //     ...__permitEdit,
    //     permitDelivery: true,
    //     permitLadenReturn: true,
    //     permitTentative: true,
    //     permitRetrieval: false,
    //   });
    // } else {
    //   __permitEdit = ({
    //     ...__permitEdit,
    //     permitDelivery: false,
    //     permitLadenReturn: false,
    //     permitTentative: false,
    //     permitRetrieval: false,
    //   });
    // };

    switch (order.order_status_id) {
      case 1:
        __permitEdit = ({
          ...__permitEdit,
          permitDelivery: true,
          permitLadenReturn: true,
          permitTentative: true,
          permitRetrieval: false,
        });
        break;
      case 4:
      case 8:
        __permitEdit = ({
          ...__permitEdit,
          permitDelivery: false,
          permitLadenReturn: true,
          permitTentative: true,
          permitRetrieval: false,
        });
        break;
      case 14:
      case 16:
      case 20:
        __permitEdit = ({
          ...__permitEdit,
          permitDelivery: false,
          permitLadenReturn: false,
          permitTentative: true,
          permitRetrieval: true,
        });
        break;
      case 24:
      case 25:
        __permitEdit = ({
          ...__permitEdit,
          permitDelivery: false,
          permitLadenReturn: false,
          permitTentative: false,
          permitRetrieval: true,
        });
        break;
      case 28:
      case 30:
      case 32:
        __permitEdit = ({
          ...__permitEdit,
          permitDelivery: false,
          permitLadenReturn: false,
          permitTentative: false,
          permitRetrieval: false,
        });
        break;
      default:
        break;
    };

    setPermitEdit(__permitEdit);
  }

  const onNotification = ({ title, message, visible, status }) => {
    setNotify({ title, message, visible, status });
  }
  const closeNotify = () => {
    setNotify({
      ...notify,
      visible: false,
    });
  }

  const getTimeIndex = (time) => {
    switch (time) {
      case "09:00 - 12:00":
        return 0;
      case "13:00 - 15:00":
        return 1;
      case "15:00 - 18:00":
        return 2;
      default:
        return 0;
    }
  }

  const getTime = (index) => {
    switch (index) {
      case 0:
        return "09:00 - 12:00";
      case 1:
        return "13:00 - 15:00";
      case 2:
        return "15:00 - 18:00";
      default:
        return "09:00 - 12:00";
    }
  }

  const customColor = {
    500: '#FFBE3D',
    700: '#FFBE3D',
  };

  const defaultMaterialTheme = createTheme({
    palette: {
      primary: customColor,
    },
  });

  const handleDeliveryDateChange = (newValue) => {
    // let __stuffInfo = stuffInfo;
    // __stuffInfo = ({...__stuffInfo, deliveryDate: newValue.format("YYYY-MM-DD")});
    setDeliveryDate(newValue);
    if (newValue >= dayjs(ladenReturnDate)) {
      setLadenReturnDate(newValue);
      // __stuffInfo = ({...__stuffInfo, ladenReturnDate: newValue.format("YYYY-MM-DD")});
      // let __expirationDate = newValue.add(props.storage_month, 'month');
      // setExpirationDate(__expirationDate);
      // __stuffInfo = ({...__stuffInfo, expirationDate: newValue.format("YYYY-MM-DD")});
    }
    // setStuffInfo(__stuffInfo);
  };
  const handleLadenReturnDateChange = (newValue) => {
    // let __stuffInfo = stuffInfo;
    // __stuffInfo = ({...__stuffInfo, ladenReturnDate: newValue.format("YYYY-MM-DD")});
    setLadenReturnDate(newValue);
    // let __expirationDate = newValue.add(props.storage_month, 'month');
    // setExpirationDate(__expirationDate);
    // __stuffInfo = ({...__stuffInfo, expirationDate: __expirationDate.format("YYYY-MM-DD")});
    if (newValue >= dayjs(tentativeDate)) {
      setTentativeDate(newValue);
      //   __stuffInfo = ({...__stuffInfo, tentativeDate: newValue.format("YYYY-MM-DD")});
    }
    // setStuffInfo(__stuffInfo);
  };
  const handleTentativeDateChange = (newValue) => {
    // let __stuffInfo = stuffInfo;
    // __stuffInfo = ({...__stuffInfo, tentativeDate: newValue.format("YYYY-MM-DD")});
    setTentativeDate(newValue);
    // if(newValue >= dayjs(expirationDate)) {
    //     setExpirationDate(newValue);
    //     __stuffInfo = ({...__stuffInfo, expirationDate: newValue.format("YYYY-MM-DD")});
    // }
    // setStuffInfo(__stuffInfo);
  };
  const handleRetrievalDateChange = (newValue) => {
    setRetrievalDate(newValue);
    if (newValue >= dayjs(emptyBoxReturnDate)) {
      setEmptyBoxReturnDate(newValue);
    }
  }
  const handleEmptyBoxReturnDateChange = (newValue) => {
    setEmptyBoxReturnDate(newValue)
  }

  const handleDeliveryTimeChange = (e) => {
    setDeliveryTimeIndex(e.target.value);
    // setStuffInfo({...stuffInfo,
    //     deliveryTimeIndex: e.target.value,
    //     deliveryTime: timelist[e.target.value].label
    // });
  };
  const handleLadenReturnTimeChange = (e) => {
    setLadenReturnTimeIndex(e.target.value);
    // setStuffInfo({...stuffInfo,
    //     ladenReturnTimeIndex: e.target.value, 
    //     ladenReturnTime: timelist[e.target.value].label
    // });
  };
  const handleTentativeTimeChange = (e) => {
    setTentativeTimeIndex(e.target.value);
    // setStuffInfo({...stuffInfo,
    //     tentativeTimeIndex: e.target.value,
    //     tentativeTime: timelist[e.target.value].label
    // });
  };
  const handleRetrievalTimeChange = (e) => {
    setRetrievalTimeIndex(e.target.value);
  }
  const handleEmptyBoxTimeChange = (e) => {
    setEmptyBoxReturnTimeIndex(e.target.value);
  }

  const updateOrderHandler = () => {
    if (permitEdit.permitTentative) {
      let data = {
        id: order.id,
        code: order.code,
        client_id: order.client_id,
        emptyout_date_other: dayjs(deliveryDate).format("YYYY-MM-DD"),
        checkin_date_other: dayjs(ladenReturnDate).format("YYYY-MM-DD"),
        checkout_date_other: dayjs(tentativeDate).format("YYYY-MM-DD"),
        emptyout_time_other: getTime(deliveryTimeIndex),
        checkin_time_other: getTime(ladenReturnTimeIndex),
        checkout_time_other: getTime(tentativeTimeIndex),
      }
      dispatch(updateOrder(data))
        .then(() => {
          onNotification({ title: 'success', message: "common.no-update-order-success", visible: true, status: Math.floor(Math.random() * 100000) });
        })
    }
  }

  const setRetrievalHandler = () => {

  }

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="mx-[-8px]">
          <Grid container className="">
            <Grid item xs={12} sm={6} md={6} className="px-[8px] py-[15px]">
              <DesktopDatePicker
                label={t("common.wd-empty-box-delivery")}
                inputFormat="DD/MM/YYYY"
                minDate={order?.emptyout_date_other}
                value={deliveryDate}
                onChange={handleDeliveryDateChange}
                disabled={!permitEdit.permitDelivery}
                renderInput={(params) => <CssTextField
                  required fullWidth
                  id="standard-required1"
                  label={t("common.wd-empty-box-delivery")}
                  variant="standard" {...params} sx={{ svg: { color: '#FFBE3D' }, button: { fontSize: 16 } }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} className="px-[8px] py-[15px]">
              <CssTextField
                id="standard-select-currency1"
                select fullWidth
                label=""
                value={deliveryTimeIndex}
                onChange={handleDeliveryTimeChange}
                disabled={!permitEdit.permitDelivery}
                className="mt-17"
                helperText=""
                variant="standard"
              >
                {timelist.map((option) => (
                  <MenuItem key={option.value} value={option.value} style={{ fontSize: '16px' }}>
                    {option.label}
                  </MenuItem>
                ))}
              </CssTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={6} className="px-[8px] py-[15px]">
              <DesktopDatePicker
                label={t("common.wd-laden-return-date")}
                inputFormat="DD/MM/YYYY"
                value={ladenReturnDate}
                minDate={deliveryDate}
                maxDate={dayjs(deliveryDate).add(14, 'day')}
                onChange={handleLadenReturnDateChange}
                disabled={!permitEdit.permitLadenReturn}
                renderInput={(params) => <CssTextField
                  label={t("common.wd-laden-return-date")}
                  required fullWidth
                  id="standard-required2"
                  variant="standard" {...params} sx={{ svg: { color: '#FFBE3D' }, }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} className="px-[9px] py-[15px]">
              <CssTextField
                id="standard-select-currency2"
                select fullWidth
                label=""
                value={ladenReturnTimeIndex}
                onChange={handleLadenReturnTimeChange}
                disabled={!permitEdit.permitLadenReturn}
                className="mt-17"
                helperText=""
                variant="standard"
              >
                {timelist.map((option) => (
                  <MenuItem key={option.value} value={option.value} style={{ fontSize: '16px' }}>
                    {option.label}
                  </MenuItem>
                ))}
              </CssTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={6} className="px-[8px] py-[15px]">
              <DesktopDatePicker
                label={t("common.wd-tentative-retrieval-date")}
                inputFormat="DD/MM/YYYY"
                value={tentativeDate}
                minDate={ladenReturnDate}
                maxDate={emptyBoxReturnDate}
                onChange={handleTentativeDateChange}
                disabled={!permitEdit.permitTentative}
                renderInput={(params) => <CssTextField
                  required fullWidth
                  id="standard-required3"
                  label={t("common.wd-tentative-retrieval-date")}
                  variant="standard" {...params} sx={{ svg: { color: '#FFBE3D' }, }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} className="px-[8px] py-[15px]">
              <CssTextField
                id="standard-select-currency3"
                select fullWidth
                label=""
                value={tentativeTimeIndex}
                onChange={handleTentativeTimeChange}
                disabled={!permitEdit.permitTentative}
                className="mt-17"
                helperText=""
                variant="standard"
              >
                {timelist.map((option) => (
                  <MenuItem key={option.value} value={option.value} style={{ fontSize: '16px' }}>
                    {option.label}
                  </MenuItem>
                ))}
              </CssTextField>
            </Grid>
          </Grid>
        </div>
        <div className="flex my-[30px]">
          <span onClick={updateOrderHandler} className={permitEdit.permitTentative ? "custom-btn hand" : "custom-btn disabled-btn"}>{t("common.wd-change")}</span>
        </div>
        <div className="mx-[-8px]">
          <Grid container className="">
            <Grid item xs={12} sm={6} md={6} className="px-[8px] py-[15px]">
              <DesktopDatePicker
                label={t("common.wd-retrieval-date")}
                inputFormat="DD/MM/YYYY"
                value={retrievalDate}
                minDate={dayjs()}
                onChange={handleRetrievalDateChange}
                disabled={!permitEdit.permitRetrieval}
                renderInput={(params) => <CssTextField
                  required fullWidth
                  id="standard-required1"
                  label={t("common.wd-empty-box-delivery")}
                  variant="standard" {...params} sx={{ svg: { color: '#FFBE3D' }, button: { fontSize: 16 } }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} className="px-[8px] py-[15px]">
              <CssTextField
                id="standard-select-currency1"
                select fullWidth
                label=""
                value={retrievalTimeIndex}
                onChange={handleRetrievalTimeChange}
                disabled={!permitEdit.permitRetrieval}
                className="mt-17"
                helperText=""
                variant="standard"
              >
                {timelist.map((option) => (
                  <MenuItem key={option.value} value={option.value} style={{ fontSize: '16px' }}>
                    {option.label}
                  </MenuItem>
                ))}
              </CssTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={6} className="px-[8px] py-[15px]">
              <DesktopDatePicker
                label={t("common.wd-empty-box-return-date")}
                inputFormat="DD/MM/YYYY"
                value={emptyBoxReturnDate}
                minDate={order?.storage_expired_date}
                onChange={handleEmptyBoxReturnDateChange}
                disabled={!permitEdit.permitRetrieval}
                renderInput={(params) => <CssTextField
                  label={t("common.wd-laden-return-date")}
                  required fullWidth
                  id="standard-required2"
                  variant="standard" {...params} sx={{ svg: { color: '#FFBE3D' }, }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} className="px-[9px] py-[15px]">
              <CssTextField
                id="standard-select-currency2"
                select fullWidth
                label=""
                value={emptyBoxReturnTimeIndex}
                onChange={handleEmptyBoxTimeChange}
                disabled={!permitEdit.permitRetrieval}
                className="mt-17"
                helperText=""
                variant="standard"
              >
                {timelist.map((option) => (
                  <MenuItem key={option.value} value={option.value} style={{ fontSize: '16px' }}>
                    {option.label}
                  </MenuItem>
                ))}
              </CssTextField>
            </Grid>
            <Grid item xs={12} sm={12} md={12} className="px-[8px] py-[15px]">
              <CssTextField
                fullWidth required
                disabled
                id="address"
                label={t("common.wd-address")}
                variant="standard"
                value={address}
                onChange={(e) => {
                  setAddress("");
                }}
              />
            </Grid>
          </Grid>
        </div>
        <div className="flex my-[30px]">
          <span onClick={setRetrievalHandler} className={permitEdit.permitRetrieval ? "custom-btn hand" : "custom-btn disabled-btn"}>{t("common.wd-retrieval-now")}</span>
        </div>
        <LoadingSpinner isLoading={isLoading} />
        <ShowNotification title={notify.title} message={notify.message} visible={notify.visible} status={notify.status} closeNotify={closeNotify} />
      </LocalizationProvider>
    </ThemeProvider>
  )
}