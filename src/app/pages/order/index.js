import { useEffect, useState } from "react";
import Header from '../../components/layout/Header'
import Stepper from '../../components/stepper'
import ContentPage from "./ContentPage";
import CartPage from "./CartPage";
import { Grid } from "@mui/material";
import Sign from "../../components/auth";
import { getStoragePeriodItem } from "../../store/apis/ordering";
import dayjs from 'dayjs';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loggedIn, setLoggedIn] = useState(0);
  const [cartInfo, setCartInfo] = useState({
    stores: [],
    stores_total: 0,
    materials: [],
    materials_total: 0,
    storage_month: 2,
    storage_period_id: 1,
    promotions: [],
    promotion_id: 0,
    total: 0,
    payment_type: 3,
  });
  const [stuffInfo, setStuffInfo] = useState({});
  const [accountInfo, setAccountInfo] = useState({});
  const [products, setProducts] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [order, setOrder] = useState({});


  useEffect(() => {
    const v = JSON.parse(localStorage.getItem("ubox-is-authenticated"));
    if (v === 1) {
      setLoggedIn(1);
    } else {
      localStorage.setItem("ubox-is-authenticated", 0);
      localStorage.removeItem("ubox-user");
      setLoggedIn(0);
    }
  }, []);

  // Fetch the price following the storage period.
  const getStoragePeriodPrice = (month, initProducts, initMaterials) => {

    if(stuffInfo.tentativeDate) {
      let __tentativeDate = dayjs(stuffInfo.deliveryDate).add(month, 'month').format("YYYY-MM-DD");
      setStuffInfo({
        ...stuffInfo,
        tentativeDate: __tentativeDate,
      });
    }

    getStoragePeriodItem(month)
      .then(res => {
          let __newPrice = res.data;
          let __products;
          let __materials;

          materials.length > 0 ? __materials = materials : __materials = initMaterials;
          products.length > 0 ? __products = products : __products = initProducts;

          // Update the price
          __materials.forEach((item, index) => {
              Object.keys(__newPrice).forEach((key) => {
                  if(parseInt(key) === item.id) {
                      __materials[index].price = __newPrice[key];
                  }
              })
          });

          __products.forEach((item, index) => {
              Object.keys(__newPrice).forEach((key) => {
                  if(parseInt(key) === item.id) {
                      __products[index].price = __newPrice[key];
                  }
              })
          });

          if(cartInfo.promotions.length > 0) {
              let __items = cartInfo.promotions;
              __materials.forEach((material, index) => {
                  __items.forEach((item) => {
                      if(item.item_id === material.id) {
                          if(__materials[index].price > item.price) {
                              __materials[index].price = item.price;
                          }
                      }
                  })
              });

              __products.forEach((product, index) => {
                  __items.forEach((item) => {
                      if(item.item_id === product.id) {
                          if(__products[index].price > item.price) {
                              __products[index].price = item.price;
                          }
                      }
                  })
              });
          }
         
          setProducts(__products);
          setMaterials(__materials);

          let __cartInfo = cartInfo;
          __cartInfo.stores.forEach((item, index) => {
              item && __products.forEach((product) => {
                  if(product.id === item.id) {
                      __cartInfo.stores[index].price = product.price;
                  }
              })
          });

          __cartInfo.materials.forEach((item, index) => {
              item && __materials.forEach((material) => {
                  if(material.id === item.id) {
                      __cartInfo.materials[index].price = material.price;
                  }
              })
          });

          onRefreshCartHandler({category: "storage_month"}, month, __cartInfo);
      });
  }

  const setPromotionPrice = (promotions, promotion_id) => {
      let __items = promotions;
      let __materials = materials;
      let __products = products;

      __materials.forEach((material, index) => {
          __items.forEach((item) => {
              if(item.item_id === material.id) {
                  if(__materials[index].price > item.price) {
                    __materials[index].price = item.price;
                  }
              }
          })
      });

      __products.forEach((product, index) => {
          __items.forEach((item) => {
              if(item.item_id === product.id) {
                  if(__products[index].price > item.price) {
                    __products[index].price = item.price;
                  }
              }
          })
      });

      setProducts(__products);
      setMaterials(__materials);

      let __cartInfo = cartInfo;
      __cartInfo.stores.forEach((item, index) => {
          item && __products.forEach((product) => {
              if(product.id === item.id) {
                  __cartInfo.stores[index].price = product.price;
              }
          })
      });

      __cartInfo.materials.forEach((item, index) => {
          item && __materials.forEach((material) => {
              if(material.id === item.id) {
                  __cartInfo.materials[index].price = material.price;
              }
          })
      });

      __cartInfo = {
        ...__cartInfo,
        promotions: promotions,
        promotion_id: promotion_id,
      };

      onRefreshCartHandler({category: "storage_month"}, cartInfo.storage_month, __cartInfo);

  }


  const onChangeStep = (step) => {
    if ((loggedIn === 0) && step > 3)
      setCurrentStep(4);
    else
      setCurrentStep(step);
  }

  const onReturnFunc = (state) => {
    if (state === true) {
      setCurrentStep(currentStep);
      setLoggedIn(1);
    }
  }

  const onCloseModal = (event) => {
    setCurrentStep(3);
  }
  
  // Add the new product and material or update the storage period.
  const onRefreshCartHandler = (item, value, newCartInfo) => {
    let __stores_total = 0;
    let __stores = cartInfo.stores;
    let __material_total = 0;
    let __materials = cartInfo.materials;
    let __storage_month = cartInfo.storage_month;
    if (item.category === 'box') {
      __stores[item.id] = {...item, count: value};
    }
    if (item.category === 'bag') {
      __materials[item.id] = {...item, count: value};
    }
    if (item.category === 'storage_month') {
      __storage_month = value;
    }

    Object.keys(__stores).forEach((iter, index) => {
      __stores_total = __stores_total + (Number.parseFloat(__stores[iter].price).valueOf() * __stores[iter].count);
    });

    Object.keys(__materials).forEach((iter, index) => {
      __material_total = __material_total + (Number.parseFloat(__materials[iter].price).valueOf() * __materials[iter].count);
    });

    let __cartInfo = cartInfo;
    if(newCartInfo) {
      __cartInfo = newCartInfo;
    }
    __stores_total = Math.round(__stores_total * 100) / 100;
    __material_total = Math.round(__material_total * 100) / 100;
    let __total = Math.round(__stores_total * __storage_month * 100) / 100 + __material_total;

    __cartInfo = {...__cartInfo, payment_type: 3, storage_month: __storage_month, stores: __stores, stores_total: __stores_total, materials: __materials, materials_total: __material_total, total: __total};
    setCartInfo(__cartInfo);
  }

  const onStepperPrevActionHandler = async () =>{
    const carts_data = cartInfo;
    if (carts_data === undefined || carts_data == null)
      return 0; // step=1
    const carts_info = cartInfo;
    if (carts_info.stores_total === 0)
      return 0; // step=1
    const stuff_data = stuffInfo;
    if (stuff_data === undefined || stuff_data == null)
      return 2; // step=3    
    const stuff_info = stuffInfo;
    if (stuff_info.name === "" || stuff_info.contact === "" || stuff_info.email === "" || stuff_info.address === "")
      return 2; // step=3    
    if (stuff_info.name && stuff_info.contact && stuff_info.email && stuff_info.address ) {
      let __email = stuff_info.email;
      let __reEmail = /\S+@\S+\.\S+/;
      let __resultEmail = __email.match(__reEmail);
      if(__resultEmail == null) {
          return 2;
      }
      let __contact = stuff_info.contact;
      let __re = /[^0-9]+/g;
      let __result = __contact.match(__re);
      let __length = __contact.length;
      if(__result == null && __length <= 11 && __length >= 8) {
      } else {
          return 2;
      }
    } else return 2; // step=3 
    const account_data = accountInfo;
    if (account_data === undefined || account_data == null)
      return 3; // step=4  
    if (account_data.isStudent === undefined) return 3;
    const account_info = accountInfo;
    if (account_info.isStudent === 1 && (account_info.university.id === undefined || account_info.university.id == null))
      return 3; // step=4  
    if (account_info.isStudent === 1 && account_info.studentID === "")
      return 3; // step=4  
    return 4;
  }

  return (
    <div className="top-container">
      <Header logged={loggedIn}>
        <Stepper step={currentStep} logged={loggedIn} stepChange={onChangeStep} previousActionCallback={onStepperPrevActionHandler} />
      </Header>
      <main className="main main-content mx-auto">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={8}>
            <ContentPage step={currentStep} logged={loggedIn} 
              stores={cartInfo.stores}
              cartMaterials={cartInfo.materials}
              storage_month={cartInfo.storage_month}
              setCartInfo={setCartInfo}
              cartInfo={cartInfo}
              products={products}
              setProducts={setProducts}
              materials={materials}
              setMaterials={setMaterials}
              stuffInfo={stuffInfo}
              setStuffInfo={setStuffInfo}
              accountInfo={accountInfo}
              setAccountInfo={setAccountInfo}
              order={order}
              setOrder={setOrder}
              stepChange={onChangeStep} 
              onRefreshCart={onRefreshCartHandler}
              getStoragePeriodPrice={getStoragePeriodPrice}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CartPage carts={cartInfo} setCartInfo={setCartInfo} setPromotionPrice={setPromotionPrice} step={currentStep} />
          </Grid>
        </Grid>
      {(currentStep === 4 && loggedIn === 0) && (
        <div className="cmodal">
          <div className="cmodal-background" onClick={onCloseModal}>
          </div>
          <div className="w-[100%] h-[100%] flex item-center item-vcenter">
            <div className="cmodal-content flex item-center my-auto">
              <Sign onReturnFunc={onReturnFunc} stuffInfo={stuffInfo} accountInfo={accountInfo} />
            </div>
          </div>
        </div>
      )}
      </main>
    </div>
  )
}
