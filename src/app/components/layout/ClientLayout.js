import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import AccountSidebar from "./AccountSidebar";
import {useDispatch, useSelector} from "react-redux";
// import { useSelector } from "react-redux/es/exports";
import { fetchAccount, fetchProducts, fetchOrders } from "../../store/actions/client";
import LoadingSpinner from "../loading-spinner";

const ClientLayout = () => {

  const [logged, setLogged] = useState(0);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("ubox-user"));
  const isLoading = useSelector((state) => state.client.loading);
  const [initial, setInitial] = useState(false);

  useEffect(() => {
    setInitial(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(initial) {
      let __logged = localStorage.getItem("ubox-is-authenticated");
      setLogged(parseInt(__logged));
      if(__logged === '1') {
        let userId = user.id;
        dispatch(fetchAccount({id: userId}));
        dispatch(fetchProducts());
        dispatch(fetchOrders({
          client_id: userId,
          label: "init",
          page: 1,
          offset: 0,
          limit: 10,
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial])

  return (
    <div className="top-container">
      <Header logged={logged} />
      <main className="main main-content-clinet mx-auto flex-wrap">
        <div className="sidebar-client">
          <AccountSidebar />
        </div>
        <div className="content-client">
          <Outlet />
        </div>
      </main>
      <LoadingSpinner isLoading={isLoading} />
    </div>
  )
}

export default ClientLayout