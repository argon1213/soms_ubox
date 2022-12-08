import { useEffect, useState } from "react";
import { getProducts } from "../../store/apis/ordering";
import { ShowNotification } from "../../components/notification";
import ContentPage1 from './ContentPage1';
import ContentPage2 from './ContentPage2';
import ContentPage3 from './ContentPage3';
import ContentPage4 from './ContentPage4';
import ContentPage5 from "./ContentPage5";
import ContentPage6 from "./ContentPage6";

const ContentPage = props => {
    const { step, logged, stepChange, products, materials, getStoragePeriodPrice, cartInfo, setCartInfo, stuffInfo, setStuffInfo, accountInfo, setAccountInfo, order, setOrder } = props;
    const [initial, setInitial] = useState(false);
    const [universities, setUniversities] = useState([]);
    const [notify, setNotify] = useState({ title: '', message: '', visible: false, status: 0 });
    
    useEffect(() => {
        setInitial(true);
    }, []);

    useEffect(() => {
        if (initial) {
            getProducts()
            .then((res) => {
                let __products = res.data.store_items;
                let __materials = res.data.material_items;
                setUniversities(res.data.universities);
                getStoragePeriodPrice(2, __products, __materials);
            })
            .catch((err) => {
            })
            .finally(() => {
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initial]);

    const onChangeHandle = () => {
        if (logged === 0 && (step === 4)) {
            stepChange(4);
        } else {
            stepChange(step === 5 ? step : step + 1);
        }
    }
    const showNotification = ({title, message, visible, status}) => {
        setNotify({ title, message, visible, status});
    }
    const closeNotify = () => {
        setNotify({
            ...notify,
            visible: false,
        });
    }
    return (
        <div className="h-[100%]">
            <ShowNotification title={notify.title} message={notify.message} visible={notify.visible} status={notify.status} closeNotify={closeNotify} />
            { step === 0 && (<ContentPage1 onNotification={showNotification} onChangeStep={onChangeHandle} onRefreshCart={props.onRefreshCart} items={products} selectedItems={props.stores} getStoragePeriodPrice={getStoragePeriodPrice} storage_month={props.storage_month} />)}
            { step === 1 && (<ContentPage2 onNotification={showNotification} onChangeStep={onChangeHandle} onRefreshCart={props.onRefreshCart} items={materials} selectedItems={props.cartMaterials} />)}
            { step === 2 && (<ContentPage3 onNotification={showNotification} onChangeStep={onChangeHandle} storage_month={props.storage_month} stuffInfo={stuffInfo} setStuffInfo={setStuffInfo} />)}
            { step === 3 && (<ContentPage4 onNotification={showNotification} onChangeStep={onChangeHandle} universities={universities} accountInfo={accountInfo} setAccountInfo={setAccountInfo} />)}
            { step === 4 && (logged === 0) && (<ContentPage4 onNotification={showNotification} onChangeStep={onChangeHandle} universities={universities} accountInfo={accountInfo} setAccountInfo={setAccountInfo} />)}
            { step === 4 && (logged === 1) && (<ContentPage5 onNotification={showNotification} onChangeStep={onChangeHandle} cartInfo={cartInfo} setCartInfo={setCartInfo} stuffInfo={stuffInfo} accountInfo={accountInfo} setOrder={setOrder} />)}
            { step === 5 && (logged === 1) && (<ContentPage6 onNotification={showNotification} onChangeStep={onChangeHandle} order={order} />)}
        </div>
    )
}

export default ContentPage;