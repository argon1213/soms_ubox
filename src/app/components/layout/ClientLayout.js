import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import AccountSidebar from "./AccountSidebar";
import { Grid } from "@mui/material";

const ClientLayout = () => {

  const [logged, setLogged] = useState(0);

  useEffect(() => {
    let __logged = localStorage.getItem("ubox-is-authenticated");
    setLogged(parseInt(__logged));
  }, [])

  return (
    <div className="top-container">
      <Header logged={logged} />
      <main className="main client-content mx-auto">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={5} md={3}>
            <AccountSidebar />
          </Grid>
          <Grid item xs={12} sm={7} md={9}>
            <Outlet />
          </Grid>
        </Grid>
      </main>
    </div>
  )
}

export default ClientLayout