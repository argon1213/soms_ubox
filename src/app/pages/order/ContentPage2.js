import { useTranslation } from "react-i18next";
import Quantity from "../../components/quantity";

export default function ContentPage2(props) {

    const { onChangeStep } = props;
    const { t, i18n } = useTranslation();

    const onNextHandler = () => {
        onChangeStep();
    }

    const onChangeQuantityHandler = (item, value) => {
        props.onRefreshCart(item, value);
    }

    return (
        <>
            <div className="content-container">
                <div className="content-page">
                    <div className="text-header text-black pb-[10px]">{t("page2.qu-would-packing")}</div>
                    <div className="text-normal text-black">{t("page2.an-would-packing")}</div>
                    <div>
                        {props.items && props.items.map((item, index) => {
                            return (
                                <div className="row item-center align-items-center mt-[20px]" key={index}>
                                    <div className="col-sm-3 col-6 min-w-[120px]">
                                        <Quantity value={(props.selectedItems && props.selectedItems[item.id]) ? props.selectedItems[item.id].count : 0} item={item} key={index} onChangeHandler={onChangeQuantityHandler} />
                                    </div>
                                    <div className="col-sm-9 col-6">
                                        <div className="row">
                                            <div className="col-sm-4 col-12 image-area">
                                                <img src={item.uri} alt="material" width={90} height={90} />
                                            </div>
                                            <div className="col-sm-8 col-12 my-auto material-des">
                                                <div className="text-normal material-des-name"><u>{i18n.language==="zh" ? item.name_cn:item.name}</u></div>
                                                <div className="text-small material-des-name">{i18n.language==="zh" ? item.description_cn:item.description}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex item-center mt-[30px]"><span className="custom-btn hand" onClick={onNextHandler}>{t("common.wd-next")}</span></div>
            </div>
        </>
    )
}