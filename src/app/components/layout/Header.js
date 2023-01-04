import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

const Header = (props) => {
    const { logged } = props;
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState()
    useEffect(() => {
        let __lang = JSON.parse(localStorage.getItem("ubox-lang"));
        setLanguage(__lang);
        i18n.changeLanguage(__lang, ()=> {
            setLanguage(__lang);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeLanguage = (lang) => {
        localStorage.setItem("ubox-lang", JSON.stringify(lang));
        i18n.changeLanguage(lang, ()=> {
            setLanguage(lang);
        });
    }
    const onLogout = () => {
        localStorage.setItem("ubox-is-authenticated", 0);
        localStorage.removeItem('ubox-user');
        // window.location.reload();
        window.location.href = "/";
    };
    const onMyOrderHandler = () => {
        window.location.href = "/client";
    }

    return (
        <>
            <div className="header">
                <div className="content mx-auto row flex justify-content-around">
                    <div className={(props.children ? "width-logo" : "w-[50%]") + " flex align-items-center "}>
                        <div className="pl-[20px] ">
                            <img src="/images/ubox-logo.png" className="link" alt="uBox Logo" width={250} height={100} 
                                onClick={(e) => {
                                    window.location.href="/";
                                }}
                            />
                        </div>
                    </div>
                    <div className={(props.children ? "col-md-6" : "d-none") + " header-container my-auto pl-[20px] flex justify-content-center"}>
                        {props.children}
                    </div>
                    <div className={(props.children ? "width-link" : "w-[50%]") + " flex align-items-center justify-content-end"}>
                        <div className="flex flex-column align-content-around min-w-[200px]">
                            <div className="flex justify-content-between align-items-center">
                                <div className="pl-[20px] py-[10px] min-w-[90] flex align-items-center">
                                    <a href="https://www.ubox.com.hk/contact/" target="_blank" rel="noreferrer" className="text-header text-yellow contact">{t("common.wd-contact")}</a>
                                </div>
                                <div className="language my-auto flex [90px]">
                                    <div>
                                        <img src="/images/lang_en.png" className={`${language === "en" ? "active link":"link"}`} alt="English Logo"  style={{ width: '38px', height: "auto"}} onClick={(e) => { onChangeLanguage("en")}} />
                                    </div>
                                    <div>
                                        <img src="/images/lang_zh.png" className={`${language === "zh" ? "active link ":"link "}`} alt="Chinese Logo" style={{ width: '38px', height: "auto"}}  onClick={(e) => { onChangeLanguage("zh")}} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-content-between align-items-center">
                                {(logged === 1) ? (
                                    <>
                                        <div className="pr-[20px] pl-[20px] py-[10px] min-w-[90] flex align-items-center">
                                            <span onClick={onMyOrderHandler} rel="noreferrer" className="text-header text-yellow contact">{t("common.wd-my-order")}</span>
                                        </div>
                                        <div className="my-auto pl-[15px] flex item-center min-w-[40px]">
                                            <img src="/images/logout.png" className="link" alt="Logout" style={{ width: '26px', height: "auto"}} onClick={onLogout} />
                                        </div>
                                    </>
                                    ) : (
                                    <>
                                        <div className="pr-[20px] pl-[20px] py-[10px] min-w-[90] flex align-items-center">
                                        </div>
                                        <div className="my-auto flex item-center py-[10px] min-w-[80px]">
                                            <Link to="/client" className="text-header text-yellow contact">{t("common.wd-signin")}</Link>
                                        </div>
                                    </>
                                )}
                                
                            </div>
                        </div>
                        <div className="flex justify-content-end flex-wrap align-content-around padding-link">
                            <div className="flex pr-[20px]">
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </>
    );
}

export default Header;