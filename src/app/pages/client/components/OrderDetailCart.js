// import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux/es/exports";
// import dayjs from 'dayjs';
// import CssTextField from "../../../components/custom-components/TextField";
// import { createTheme, Grid, MenuItem, ThemeProvider } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const OrderDetailCart = (props) => {
  const {order} = props;
  const { t, i18n } = useTranslation();

  return (
    <div className="content">
        <div className="mb-[29px]">
            <span className="text-header text-black">{t("cart.no-order-detail")}</span>
        </div>
        <div>
            <span className="text-header text-black">{t("cart.no-storage-month")}</span>
        </div>
        <div>
            {order.items?.map((item, index) => {
                if (item.item_qty === 0) return <div key={index}></div>;
                if(item.item_category === "box") {
                    return (
                        <div className="flex space-between mt-[20px]" key={index}>
                            <div>
                                <div className="text-normal text-black" >{item.item_qty} x {i18n.language==="zh" ? item.item.name_cn:item.item.name}</div>
                                <div className="text-normal text-black" >${item.item.price} {t("cart.no-per-box")}</div>
                            </div>
                            <div className="my-auto" >
                                <span className="text-normal text-black">${item.item_qty * item.item.price}</span>
                            </div>
                        </div>
                    )
                }
                return <div key={index}></div>;
            })}
            <div className="space-line mt-[20px] mb-[20px]">
            </div>
        </div>
        <div className="flex space-between my-[20px]">
            <span className="text-header text-black">{t("common.wd-subtotal")}</span>
            <span className="text-header text-black">${order.product_total_fee ? order.product_total_fee : '0.00' }</span>
        </div>
        {
            order.vacuumBags !== undefined && order.vacuumBags > 0 && (
                <div className="mt-[20px]">
                    <div>
                        <span className="text-header text-black">{t("cart.no-packing-materials")}</span>
                    </div>
                    {order.items?.map((item, index) => {
                        if (item.item_qty === 0) return <div key={index}></div>;
                        if(item.item_category === "bag") {
                            return (
                                <div className="flex space-between mt-[20px]" key={index}>
                                    <div>
                                        <div className="text-normal text-black" >{item.item_qty} x {i18n.language==="zh" ? item.item.name_cn:item.item.name}</div>
                                        <div className="text-normal text-black" >${item.item.price} {t("cart.no-per-box")}</div>
                                    </div>
                                    <div className="my-auto">
                                        <span className="text-normal text-black">${item.item_qty * item.item.price}</span>
                                    </div>
                                </div>
                            ) 
                        }
                        return <div key={index}></div>;
                    })}
                    <div className="space-line mt-[20px] mb-[20px]">
                    </div>
                </div>
            )
        }
        <div className="flex space-between my-[20px]">
            <span>
                <span className="text-header text-black">{t("common.wd-total")}</span>
                <span className="text-normal text-black"> ({order.storage_month ? order.storage_month : 0} {t("common.wd-months")})</span>
            </span>
            <span className="text-header text-black">${order.total_fee ? order.total_fee : '0.00'}</span>
        </div>
        <div className="flex space-between my-[20px]">
            <span>
                <span className="text-header text-black">{t("common.wd-paid-by", {name: order.client?.name})}</span>
            </span>
            <span className="text-header text-black">${order.paid_fee ? order.paid_fee : '0.00'}</span>
        </div>
        <div className="flex space-between my-[20px]">
            <span>
                <span className="text-header text-black">{t("common.wd-outstanding")}</span>
            </span>
            <span className="text-header text-black">${order.balance ? order.balance : '0.00'}</span>
        </div>
    </div>
    )
}