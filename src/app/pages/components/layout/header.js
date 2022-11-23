// import Image from 'next/image'
// import Head from "next/head";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
// import Link from 'next/link';

const Header = (props) => {
    const { logged } = props;
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState()
    useEffect(() => {
        setLanguage(i18n.language);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeLanguage = (lang) => {
        i18n.changeLanguage(lang, ()=> {
            setLanguage(lang);
        });
    }
    const onLogout = () => {
        localStorage.setItem("ubox-is-authenticated", 0);
        localStorage.removeItem('ubox-user');
        window.location.reload();
    };

    return (
        <>
            <div className="header">
                <div className="content mx-auto">
                    <div className="pl-[20px] align-items-center">
                        <img src="/images/ubox-logo.png" className="link" alt="uBox Logo" width={250} height={100} 
                            onClick={(e) => {
                                window.location.href="/";
                            }}
                        />
                    </div>
                    <div className="header-container my-auto">
                        {props.children}
                    </div>
                    <div className="flex pr-[20px]">
                        <div className="language my-auto flex min-w-[90px]">
                            <div>
                                <img src="/images/lang_en.png" className={`${language === "en" ? "active link":"link"}`} alt="English Logo"  style={{ width: '38px', height: "auto"}} onClick={(e) => { onChangeLanguage("en")}} />
                            </div>
                            <div>
                                <img src="/images/lang_zh.png" className={`${language === "zh" ? "active link ":"link "}`} alt="Chinese Logo" style={{ width: '38px', height: "auto"}}  onClick={(e) => { onChangeLanguage("zh")}} />
                            </div>
                        </div>
                        {(logged === 1) && (
                            <div className="my-auto min-w-[50px] flex item-center">
                                <img src="/images/logout.png" className="link" alt="Logout" style={{ width: '26px', height: "auto"}} onClick={onLogout} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;