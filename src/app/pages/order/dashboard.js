import React, { Component, useEffect, useState } from "react";
import Head from "next/head";
import checkAuthority from "../lib/auth-check";

export default function Dashboard(props) {
  const [loggedIn, setLoggedIn] = useState();
  useEffect(() => {
    setLoggedIn(checkAuthority());
  }, []);

  if (!loggedIn)  {
    return (
      <div className="home flex">

      </div>
    );  
  } else {
    return (
      <div className="home flex w-[100%] h-[100vh]">
        <Head>
          <title>uBox</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <main className="w-[100vw] m-auto flex item-center">
            <h1>This is cusomter's dashboard page.</h1>
        </main>
      </div>
    );  
  }
}
