import { useEffect, useState } from "react";
import { Grid, Box, Slider } from '@mui/material';
import Modal from '@mui/material/Modal';
import Quantity from "../../components/quantity";
import NumberInput from '../../components/quantity/NumberInput';
import { useTranslation } from "react-i18next";

export default function ContentPage1(props) {
    const [duration, setDuration] = useState(1);
    const { onChangeStep, onNotification } = props;
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { t, i18n } = useTranslation();

    const handleSliderChange = (event, newValue) => {
        const value = newValue;
        setDuration(value);
    };

    const changeSliderStatus = (e, value) => {
        props.getStoragePeriodPrice(value);
    }

    const handleInputChange = (newValue) => {
        const value = newValue === "" ? 1 : Number(newValue);
        setDuration(value);
    };

    const onNextHandler = () => {
        let flag = false;
        props.selectedItems && Object.keys(props.selectedItems).forEach((iter, index) => {
            if (props.selectedItems[iter] && props.selectedItems[iter].count && props.selectedItems[iter].count > 0) {
                flag = true;
            }
        });

        if (flag === false) {
            onNotification({ title: 'warning', message: "common.no-select-item", visible: true, status: Math.floor(Math.random() * 100000) });
        } else onChangeStep();
    }

    const PrettoSliderStyle = {
        color: '#FFBE3D',
        height: 8,
        '& .MuiSlider-track': {
            border: 'none',
        },
        '& .MuiSlider-thumb': {
            height: 24,
            width: 24,
            backgroundColor: '#FFBE3D',
            border: '2px solid currentColor',
            '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                boxShadow: 'inherit',
            },
            '&:before': {
                display: 'none',
            },
        },
        '& .MuiSlider-valueLabel': {
            display: 'none',
        },
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const openDialog = (item) => {
        setSelectedItem(item);
        handleOpen();
    }

    const onChangeQuantityHandler = (item, value) => {
        props.onRefreshCart(item, value);
    }

    useEffect(() => {
        setDuration(props.storage_month);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Box sx={style}>
                    <div className="product">
                        <div className="flex pt-[25px] pr-[25px] close-button">
                            <img src="/images/close.png" alt="product" className="hand" onClick={handleClose} width={28} height={28} />
                        </div>
                        <div className="ml-[40px] mr-[40px] mb-[40px]">
                            <div className="text-header">{i18n.language==="zh" ? selectedItem?.item.name_cn:selectedItem?.item.name}</div>
                            <div className="product-modal-content">
                                <div className="image-area flex mx-[20px] my-[20px] align-items-center product-modal-img">
                                    <img src={selectedItem?.item.uri} alt="product" width={90} height={90} onClick={(e) => { handleClose() }} />
                                </div>
                                <div className="product-modal-des">
                                    <div className="text-header">{t("common.wd-description")}</div>
                                    <div className="text-header-400 ml-[15px]">{i18n.language==="zh" ? selectedItem?.item.description_cn:selectedItem?.item.description}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
            <div className="content-container">
                <div className="content-page">
                    <div className="text-header text-black pb-[10px]">{t("page1.qu-how-long")}</div>
                    <div className="text-normal text-black">{t("page1.an-how-long")}</div>
                    <Grid container spacing={0} className="mt-[36px]">
                        <Grid item xs={12} sm={4} md={4} >
                            <div className="flex item-center">
                                <NumberInput className="mx-[14px]" value={duration} onChange={handleInputChange} />
                                <div className="flex my-auto">
                                    <span className="text-normal">{t("common.wd-months")}</span>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8} md={8} className="my-auto">
                            <div className="flex my-auto w-[100%] xs:mt-[20px]">
                                <Slider value={duration} aria-label="pretto slider" valueLabelDisplay="auto" min={2} max={18} sx={PrettoSliderStyle} onChange={handleSliderChange} onChangeCommitted={changeSliderStatus}/>
                            </div>
                        </Grid>
                    </Grid>
                    <div className="spin-line" />
                    <div className="text-header text-black mt-[37px] mb-[17px]">{t("page1.qu-what-store")}</div>
                    <div>
                        {props.items && props.items.map((item, index) => {
                            return (
                                <div className="mt-[25px]" key={index}>
                                    <div className="row align-items-center item-center" key={index}>
                                        <div className="col-sm-3 col-6 min-w-[120px] py-[20px]" style={{zIndex: "100"}}>
                                            <Quantity value={(props.selectedItems && props.selectedItems[item.id]) ? props.selectedItems[item.id].count : 0} item={item} key={index} onChangeHandler={onChangeQuantityHandler} />
                                        </div>
                                        <div className="col-sm-9 col-6">
                                            <div className="row align-items-center">
                                                <div className="col-sm-4 col-12 mr-[0px] image-area">
                                                    <img src={item.uri} alt="material" style={{width: '90px', height: '90px'}} sx={{}} onClick={(e) => { openDialog({ item }) }} />
                                                </div>
                                                <div className="col-sm-8 col-12 my-auto product-des">
                                                    <div className="text-normal hand product-des-name" onClick={(e) => { openDialog({ item }) }}><u>{i18n.language === "zh" ? item.name_cn: item.name}</u></div>
                                                    <div className="text-small product-des-detail">{i18n.language==="zh" ? item.description_cn:item.description}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="flex item-center mt-[35px]"><span className="custom-btn hand" onClick={onNextHandler}>{t("common.wd-next")}</span></div>
        </div>
    )
}