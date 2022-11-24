/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import dayjs from 'dayjs';
import CssTextField from "../../components/custom-components/TextField";
import { createTheme, Grid, MenuItem, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const OrderDetail = (props) => {
  const { t } = useTranslation();
  const [initial, setInitial] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(dayjs().add(2, 'day'));
  const [ladenReturnDate, setLadenReturnDate] = useState(dayjs().add(2, 'day'));
  const [tentativeDate, setTentativeDate] = useState(dayjs().add(2, 'day'));
  const [deliveryTimeIndex, setDeliveryTimeIndex] = useState(0);
  const [ladenReturnTimeIndex, setLadenReturnTimeIndex] = useState(0);
  const [tentativeTimeIndex, setTentativeTimeIndex] = useState(0);

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
    setInitial(true);
  }, []);

  useEffect(() => {
    if(initial) {
      // setDeliveryDate(__stuffInfo.deliveryDate ? __stuffInfo.deliveryDate : dayjs().add(2, 'day'));
      // setLadenReturnDate(__stuffInfo.ladenReturnDate ? __stuffInfo.ladenReturnDate : dayjs().add(2, 'day'));
      // setTentativeDate(__stuffInfo.tentativeDate ? __stuffInfo.tentativeDate : dayjs().add(props.storage_month, "month").add(2, 'day'));
      // setExpirationDate(__stuffInfo.expirationDate ? dayjs(__stuffInfo.ladenReturnDate).add(props.storage_month, "month") : dayjs().add(props.storage_month, "month").add(2, 'day'));
      // setDeliveryTimeIndex(__stuffInfo.deliveryTimeIndex ? __stuffInfo.deliveryTimeIndex : '0');
      // setLadenReturnTimeIndex(__stuffInfo.ladenReturnTimeIndex ? __stuffInfo.ladenReturnTimeIndex : 0);
      // setTentativeTimeIndex(__stuffInfo.tentativeTimeIndex ? __stuffInfo.tentativeTimeIndex : 0);
    }
  }, [initial])

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
    // if(newValue >= dayjs(ladenReturnDate)) {
    //     setLadenReturnDate(newValue);
    //     __stuffInfo = ({...__stuffInfo, ladenReturnDate: newValue.format("YYYY-MM-DD")});
    //     let __expirationDate = newValue.add(props.storage_month, 'month');
    //     setExpirationDate(__expirationDate);
    //     __stuffInfo = ({...__stuffInfo, expirationDate: newValue.format("YYYY-MM-DD")});
    // }
    // setStuffInfo(__stuffInfo);
  };
  const handleLadenReturnDateChange = (newValue) => {
      // let __stuffInfo = stuffInfo;
      // __stuffInfo = ({...__stuffInfo, ladenReturnDate: newValue.format("YYYY-MM-DD")});
      setLadenReturnDate(newValue);
      // let __expirationDate = newValue.add(props.storage_month, 'month');
      // setExpirationDate(__expirationDate);
      // __stuffInfo = ({...__stuffInfo, expirationDate: __expirationDate.format("YYYY-MM-DD")});
      // if(newValue >= dayjs(tentativeDate)) {
      //     setTentativeDate(newValue);
      //     __stuffInfo = ({...__stuffInfo, tentativeDate: newValue.format("YYYY-MM-DD")});
      // }
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

  return (
    <div className="content-container">
      <div className="content-page">
        <div className="flex flex-row-reverse mt-[30px] mr-[20px]">
          <span className="btn hand">{t("common.wd-new-boxes")}</span>
        </div>
        <div className="text-normal text-black py-[10px]">
          <span>{t("oder-detail.no-title",{order: "#1232313", date: "11/2/2022", orderState: "In-progress"})}</span>
        </div>
        <div>
          <Grid container className="mx-[-15px]">
            <Grid item xs={12} sm={12} md={6} className="px-[15px]">
              <div className="content">
                  <div className="mb-[29px]">
                    <span className="text-header text-black">{t("cart.no-upfront")}</span>
                  </div>
                  <div>
                      <span className="text-header text-black">{t("cart.no-storage-month")}</span>
                  </div>
                  <div>
                      {
                          // props.carts && props.carts.stores && Object.keys(props.carts.stores).map((iter, index) => {
                          //     const item = props.carts.stores[iter];
                          //     if (item.count === 0)
                          //         return <div key={index}></div>;
                          //     return (
                          //         <div className="flex space-between mt-[20px]" key={index}>
                          //             <div>
                          //                 <div className="text-normal text-black">{item.count} x {item.name}</div>
                          //                 <div className="text-normal text-black">${item.price} {t("cart.no-per-box")}</div>
                          //             </div>
                          //             <div className="my-auto">
                          //                 <span className="text-normal text-black">${item.count * item.price}</span>
                          //             </div>
                          //         </div>
                          //     )    
                          // })
                      }
                      <div className="space-line mt-[20px] mb-[20px]">
                      </div>
                  </div>
                  {/* {props.carts && props.carts.materials_total > 0 && (
                      <>
                      <div className="flex space-between">
                          <span className="text-header text-black">{t("common.wd-subtotal")}</span>
                          <span className="text-header text-black">${props.carts.stores_total}</span>
                      </div>
                      <div className="mt-[24px]">
                          <span className="text-header text-black">{t("cart.no-packing-material")}</span>
                      </div>
                      <div>
                      {
                          props.carts && props.carts.materials && Object.keys(props.carts.materials).map((iter, index) => {
                              const item = props.carts.materials[iter];
                              if (item.count === 0)
                                  return <div key={index}></div>;
                              return (
                                  <div className="flex space-between mt-[20px]" key={index}>
                                      <div>
                                          <div className="text-normal text-black">{item.count} x {item.name}</div>
                                          <div className="text-normal text-black">${item.price} {t("cart.no-per-box")}</div>
                                      </div>
                                      <div className="my-auto">
                                          <span className="text-normal text-black">${item.count * item.price}</span>
                                      </div>
                                  </div>
                              )    
                          })
                      }
                          <div className="space-line mt-[20px] mb-[20px]">
                          </div>                
                      </div>
                      </>
                  )} */}
                  <div className="flex space-between">
                      <span>
                          <span className="text-header text-black">{t("common.wd-total")}</span>
                          <span className="text-normal text-black"> ({props.carts?.storage_month} months)</span>
                      </span>
                      <span className="text-header text-black">${props.carts ? props.carts.total : 0}</span>
                  </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} className="px-[15px]">
              <ThemeProvider theme={defaultMaterialTheme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid container className="mx-[-8px]">
                    <Grid item xs={12} sm={6} md={6} className="px-[8px] py-[15px]">
                        <DesktopDatePicker
                            label={t("common.wd-empty-box-delivery")}
                            inputFormat="DD/MM/YYYY"
                            value={deliveryDate}
                            minDate={dayjs().add(2, 'day')}
                            onChange={handleDeliveryDateChange}
                            renderInput={(params) => <CssTextField
                                required fullWidth
                                id="standard-required1"
                                label={t("common.wd-empty-box-delivery")}
                                variant="standard" {...params} sx={{ svg: { color: '#FFBE3D' }, button: {fontSize: 16} }} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} className="px-[8px] py-[15px]">
                        <CssTextField
                            id="standard-select-currency1"
                            select fullWidth
                            label=""
                            value={deliveryTimeIndex}
                            onChange={handleDeliveryTimeChange}
                            className="mt-17"
                            helperText=""
                            variant="standard"
                        >
                            {timelist.map((option) => (
                                <MenuItem key={option.value} value={option.value} style={{fontSize: '16px'}}>
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
                            onChange={handleLadenReturnDateChange}
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
                            className="mt-17"
                            helperText=""
                            variant="standard"
                        >
                            {timelist.map((option) => (
                                <MenuItem key={option.value} value={option.value} style={{fontSize: '16px'}}>
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
                            onChange={handleTentativeDateChange}
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
                            className="mt-17"
                            helperText=""
                            variant="standard"
                        >
                            {timelist.map((option) => (
                                <MenuItem key={option.value} value={option.value} style={{fontSize: '16px'}}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </CssTextField>
                    </Grid>
                  </Grid>
                  <div className="flex my-[30px]">
                    <span className="btn hand">{t("common.wd-change")}</span>
                  </div>
                  <Grid container className="mx-[-8px]">
                    <Grid item xs={12} sm={6} md={6} className="px-[8px] py-[15px]">
                        <DesktopDatePicker
                            label={t("common.wd-retrieval-date")}
                            inputFormat="DD/MM/YYYY"
                            value={deliveryDate}
                            minDate={dayjs().add(2, 'day')}
                            onChange={handleDeliveryDateChange}
                            renderInput={(params) => <CssTextField
                                required fullWidth
                                id="standard-required1"
                                label={t("common.wd-empty-box-delivery")}
                                variant="standard" {...params} sx={{ svg: { color: '#FFBE3D' }, button: {fontSize: 16} }} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} className="px-[8px] py-[15px]">
                        <CssTextField
                            id="standard-select-currency1"
                            select fullWidth
                            label=""
                            value={deliveryTimeIndex}
                            onChange={handleDeliveryTimeChange}
                            className="mt-17"
                            helperText=""
                            variant="standard"
                        >
                            {timelist.map((option) => (
                                <MenuItem key={option.value} value={option.value} style={{fontSize: '16px'}}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </CssTextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} className="px-[8px] py-[15px]">
                        <DesktopDatePicker
                            label={t("common.wd-empty-box-return-date")}
                            inputFormat="DD/MM/YYYY"
                            value={ladenReturnDate}
                            minDate={deliveryDate}
                            onChange={handleLadenReturnDateChange}
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
                            className="mt-17"
                            helperText=""
                            variant="standard"
                        >
                            {timelist.map((option) => (
                                <MenuItem key={option.value} value={option.value} style={{fontSize: '16px'}}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </CssTextField>
                    </Grid>
                  </Grid>
                  <div className="flex my-[30px]">
                    <span className="btn hand">{t("common.wd-retrieval")}</span>
                  </div>
                </LocalizationProvider>
              </ThemeProvider>
            </Grid>
          </Grid>
        </div>
        
      </div>
     </div>
  )
}

export default OrderDetail

