import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from 'dayjs';
import CssTextField from '../../components/custom-components/TextField';
import { createTheme, Grid, MenuItem, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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
export default function ContentPage3(props) {
    const { onChangeStep, onNotification, stuffInfo, setStuffInfo } = props;
    const [deliveryDate, setDeliveryDate] = useState(dayjs().add(2, 'day').format("yyyy-mm-dd"));
    const [ladenReturnDate, setLadenReturnDate] = useState(dayjs().add(2, 'day'));
    const [tentativeDate, setTentativeDate] = useState(dayjs().add(2, 'day'));
    const [expirationDate, setExpirationDate] = useState(dayjs().add(2, 'day'));
    const [deliveryTimeIndex, setDeliveryTimeIndex] = useState(0);
    const [ladenReturnTimeIndex, setLadenReturnTimeIndex] = useState(0);
    const [tentativeTimeIndex, setTentativeTimeIndex] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [initial, setInitial] = useState(false);
    const { t } = useTranslation();
    const __userInfo = localStorage.getItem("ubox-user") ? JSON.parse(localStorage.getItem("ubox-user")) : "";
    const [deliveryMinDate, setDeliveryMinDate] = useState(dayjs().add(1, 'day'));

    useEffect(() => {
        setInitial(true);
    }, []);

    useEffect(() => {
        if (initial) {
            let __stuffInfo = stuffInfo;
            let __today = new Date();
            let __time = __today.getHours();
            let __deliveryDate = dayjs().add(2, 'day');
            if(__time < 12) {
                __deliveryDate = dayjs().add(1, 'day');
            }
            setDeliveryMinDate(__deliveryDate);
            setName(__stuffInfo.name ? __stuffInfo.name : "");
            setEmail(__stuffInfo.email ? __stuffInfo.email : "");
            setContact(__stuffInfo.contact ? __stuffInfo.contact : "");
            setAddress(__stuffInfo.address ? __stuffInfo.address : "");
            setDeliveryDate(__stuffInfo.deliveryDate ? __stuffInfo.deliveryDate : __deliveryDate);
            setLadenReturnDate(__stuffInfo.ladenReturnDate ? __stuffInfo.ladenReturnDate : __deliveryDate);
            setTentativeDate(__stuffInfo.tentativeDate ? __stuffInfo.tentativeDate : __deliveryDate.add(props.storage_month, "month"));
            setExpirationDate(__stuffInfo.expirationDate ? dayjs(__stuffInfo.ladenReturnDate).add(props.storage_month, "month") : __deliveryDate.add(props.storage_month, "month"));
            setDeliveryTimeIndex(__stuffInfo.deliveryTimeIndex ? __stuffInfo.deliveryTimeIndex : '0');
            setLadenReturnTimeIndex(__stuffInfo.ladenReturnTimeIndex ? __stuffInfo.ladenReturnTimeIndex : 0);
            setTentativeTimeIndex(__stuffInfo.tentativeTimeIndex ? __stuffInfo.tentativeTimeIndex : 0);

            stuffInfo.deliveryDate === undefined && setStuffInfo({
                name: "",
                email: "",
                contact: "",
                address: "",
                deliveryDate: __deliveryDate.format("YYYY-MM-DD"),
                deliveryTime: "09:00 - 12:00",
                deliveryTimeIndex: 0,
                ladenReturnDate: __deliveryDate.format("YYYY-MM-DD"),
                ladenReturnTime: "09:00 - 12:00",
                ladenReturnTimeIndex: 0,
                tentativeDate: __deliveryDate.add(props.storage_month, "month").format("YYYY-MM-DD"),
                tentativeTime: "09:00 - 12:00",
                tentativeTimeIndex: 0, 
                expirationDate: __deliveryDate.add(props.storage_month, "month").format("YYYY-MM-DD"),
            })

            if(JSON.parse(localStorage.getItem("ubox-is-authenticated")) === 1){
                // const __userInfo = localStorage.getItem("ubox-user") ? JSON.parse(localStorage.getItem("ubox-user")) : "";
                __userInfo.name && setName(__userInfo.name);
                __userInfo.email && setEmail(__userInfo.email);

                if(stuffInfo.name === undefined) {
                    __userInfo.contact && setContact(__userInfo.contact);
                    __userInfo.address1 && setAddress(__userInfo.address1);
                    setStuffInfo({
                        ...stuffInfo,
                        name: __userInfo.name,
                        email: __userInfo.email,
                        contact: __userInfo.contact,
                        address: __userInfo.address1,
                        deliveryDate: __deliveryDate.format("YYYY-MM-DD"),
                        deliveryTime: "09:00 - 12:00",
                        deliveryTimeIndex: 0,
                        ladenReturnDate: __deliveryDate.format("YYYY-MM-DD"),
                        ladenReturnTime: "09:00 - 12:00",
                        ladenReturnTimeIndex: 0,
                        tentativeDate: __deliveryDate.add(props.storage_month, "month").format("YYYY-MM-DD"),
                        tentativeTime: "09:00 - 12:00",
                        tentativeTimeIndex: 0, 
                        expirationDate: __deliveryDate.add(props.storage_month, "month").format("YYYY-MM-DD"),
                    });
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initial]);

    const onNextHandler = () => {
        // validation checking...
        if (name === "") {
            onNotification({ title: 'warning', message: "common.no-input-name", visible: true, status: Math.floor(Math.random() * 100000) });
            return;
        }
        if(name.length > 100) {
            onNotification({ title: 'warning', message: "common.no-input-name-length", visible: true, status: Math.floor(Math.random() * 100000) });
            return;
        }
        if (email === "") {
            onNotification({ title: 'warning', message: "common.no-input-email", visible: true, status: Math.floor(Math.random() * 100000) });
            return;
        } else {
            let __email = email;
            let __re = /\S+@\S+\.\S+/;
            let __result = __email.match(__re);
            if(__result == null) {
                onNotification({ title: 'warning', message: "common.no-input-email-validate", visible: true, status: Math.floor(Math.random() * 100000) });
                return;
            }
        }
        if(email.length > 100) {
            onNotification({ title: 'warning', message: "common.no-input-email-length", visible: true, status: Math.floor(Math.random() * 100000) });
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
        if (address === "") {
            onNotification({ title: 'warning', message: "common.no-input-address", visible: true, status: Math.floor(Math.random() * 100000) });
            return;
        } else if (address.length > 250) {
            onNotification({ title: 'warning', message: "common.no-input-address-length", visible: true, status: Math.floor(Math.random() * 100000) });
            return;
        }

        onChangeStep();
    }

    const handleDeliveryDateChange = (newValue) => {
        let __stuffInfo = stuffInfo;
        __stuffInfo = ({...__stuffInfo, deliveryDate: newValue.format("YYYY-MM-DD")});
        setDeliveryDate(newValue);
        if(newValue >= dayjs(ladenReturnDate)) {
            setLadenReturnDate(newValue);
            __stuffInfo = ({...__stuffInfo, ladenReturnDate: newValue.format("YYYY-MM-DD")});
            let __expirationDate = newValue.add(props.storage_month, 'month');
            setExpirationDate(__expirationDate);
            __stuffInfo = ({...__stuffInfo, expirationDate: newValue.format("YYYY-MM-DD")});
        }
        setStuffInfo(__stuffInfo);
    };
    const handleLadenReturnDateChange = (newValue) => {
        let __stuffInfo = stuffInfo;
        __stuffInfo = ({...__stuffInfo, ladenReturnDate: newValue.format("YYYY-MM-DD")});
        setLadenReturnDate(newValue);
        let __expirationDate = newValue.add(props.storage_month, 'month');
        setExpirationDate(__expirationDate);
        __stuffInfo = ({...__stuffInfo, expirationDate: __expirationDate.format("YYYY-MM-DD")});
        if(newValue >= dayjs(tentativeDate)) {
            setTentativeDate(newValue);
            __stuffInfo = ({...__stuffInfo, tentativeDate: newValue.format("YYYY-MM-DD")});
        }
        setStuffInfo(__stuffInfo);
    };
    const handleTentativeDateChange = (newValue) => {
        let __stuffInfo = stuffInfo;
        __stuffInfo = ({...__stuffInfo, tentativeDate: newValue.format("YYYY-MM-DD")});
        setTentativeDate(newValue);
        if(newValue >= dayjs(expirationDate)) {
            setExpirationDate(newValue);
            __stuffInfo = ({...__stuffInfo, expirationDate: newValue.format("YYYY-MM-DD")});
        }
        setStuffInfo(__stuffInfo);
    };
    const handleExpirationDateChange = (newValue) => {
        setTentativeDate(newValue);
    };
    const handleDeliveryTimeChange = (e) => {
        setDeliveryTimeIndex(e.target.value);
        setStuffInfo({...stuffInfo,
            deliveryTimeIndex: e.target.value,
            deliveryTime: timelist[e.target.value].label
        });
    };
    const handleLadenReturnTimeChange = (e) => {
        setLadenReturnTimeIndex(e.target.value);
        setStuffInfo({...stuffInfo,
            ladenReturnTimeIndex: e.target.value, 
            ladenReturnTime: timelist[e.target.value].label
        });
    };
    const handleTentativeTimeChange = (e) => {
        setTentativeTimeIndex(e.target.value);
        setStuffInfo({...stuffInfo,
            tentativeTimeIndex: e.target.value,
            tentativeTime: timelist[e.target.value].label
        });
    };

    const customColor = {
        500: '#FFBE3D',
        700: '#FFBE3D',
    };

    const defaultMaterialTheme = createTheme({
        palette: {
            primary: customColor,
        },
    });

    return (
        <ThemeProvider theme={defaultMaterialTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="content-container">
                    <div className="content-page">
                        <div className="text-header text-black pb-[10px]">{t("page3.qu-where-collect")}</div>
                        <div className="text-normal text-black">{t("page3.an-where-collect")}</div>
                        <div className="mt-[35px]">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={6}>
                                    <CssTextField
                                        required fullWidth
                                        id="standard-required"
                                        label={t("common.wd-name")}
                                        variant="standard"
                                        value={__userInfo.name ? __userInfo.name : name}
                                        InputProps={__userInfo.name ? {readOnly: true} : {readOnly: false}}
                                        onChange={(e) => { 
                                            setName(e.target.value);
                                        }}
                                        onBlur={(e) => {
                                            setStuffInfo({...stuffInfo, name: e.target.value});
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <CssTextField
                                        required fullWidth
                                        id="standard-required"
                                        label={t("common.wd-email")}
                                        variant="standard"
                                        value={__userInfo.email ? __userInfo.email : email}
                                        type="email"
                                        InputProps={__userInfo.email ? {readOnly: true} : {readOnly: false}}
                                        onChange={(e) => { 
                                            setEmail(e.target.value);
                                        }}
                                        onBlur={(e) => {
                                            setStuffInfo({...stuffInfo, email: e.target.value});
                                            // let __email = e.target.value;
                                            // let __re = /\S+@\S+\.\S+/;
                                            // let __result = __email.match(__re);
                                            // if(__result == null) {
                                            //     onNotification({ title: 'warning', message: "common.no-input-email-validate", visible: true, status: Math.floor(Math.random() * 100000) });
                                            // }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <CssTextField
                                        required fullWidth
                                        id="standard-required"
                                        label={t("common.wd-contact")}
                                        variant="standard"
                                        value={contact}
                                        onChange={(e) => { 
                                            setContact(e.target.value);
                                        }}
                                        onBlur={(e) => {
                                            setStuffInfo({...stuffInfo, contact: (e.target.value)});
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
                                <Grid item xs={12} sm={12} md={12}>
                                    <CssTextField
                                        required fullWidth
                                        id="standard-required"
                                        label={t("common.wd-address")}
                                        variant="standard"
                                        value={address}
                                        onChange={(e) => { 
                                            setAddress(e.target.value);
                                            setStuffInfo({...stuffInfo, address: e.target.value});
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <DesktopDatePicker
                                        label={t("common.wd-empty-box-delivery")}
                                        inputFormat="DD/MM/YYYY"
                                        value={deliveryDate}
                                        minDate={deliveryMinDate}
                                        onChange={handleDeliveryDateChange}
                                        renderInput={(params) => <CssTextField
                                            required fullWidth
                                            id="standard-required1"
                                            label={t("common.wd-empty-box-delivery")}
                                            variant="standard" {...params} sx={{ svg: { color: '#FFBE3D' }, button: {fontSize: 16} }} />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
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
                                <Grid item xs={12} sm={6} md={6}>
                                    <DesktopDatePicker
                                        label={t("common.wd-laden-return-date")}
                                        inputFormat="DD/MM/YYYY"
                                        value={ladenReturnDate}
                                        minDate={deliveryDate}
                                        maxDate={dayjs(deliveryDate).add(14, 'day')}
                                        onChange={handleLadenReturnDateChange}
                                        renderInput={(params) => <CssTextField
                                            label={t("common.wd-laden-return-date")}
                                            required fullWidth
                                            id="standard-required2"
                                            variant="standard" {...params} sx={{ svg: { color: '#FFBE3D' }, }} />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
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
                                <Grid item xs={12} sm={6} md={6}>
                                    <DesktopDatePicker
                                        label={t("common.wd-tentative-retrieval-date")}
                                        inputFormat="DD/MM/YYYY"
                                        value={tentativeDate}
                                        minDate={ladenReturnDate}
                                        maxDate={expirationDate}
                                        onChange={handleTentativeDateChange}
                                        renderInput={(params) => <CssTextField
                                            required fullWidth
                                            id="standard-required3"
                                            label={t("common.wd-tentative-retrieval-date")}
                                            variant="standard" {...params} sx={{ svg: { color: '#FFBE3D' }, }} />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
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
                                <Grid item xs={12} sm={6} md={6}>
                                    <DesktopDatePicker
                                        label={t("common.wd-storage-expiration-date")}
                                        inputFormat="DD/MM/YYYY"
                                        readOnly
                                        value={expirationDate}
                                        onChange={handleExpirationDateChange}
                                        renderInput={(params) => <CssTextField
                                            required fullWidth
                                            id="standard-required3"
                                            label={t("common.wd-storage-expiration-date")}
                                            variant="standard" {...params} sx={{ svg: { color: '#FFBE3D' }, }} />}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div className="flex item-center mt-[30px]"><span className="custom-btn hand" onClick={onNextHandler}>{t("common.wd-next")}</span></div>
                </div>
            </LocalizationProvider>
        </ThemeProvider>
    )
}