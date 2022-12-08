
import { useEffect } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { fetchClientsApi } from "../../../store/apis/admin";


const ClientListPage = () => {
  useEffect(() => {
    fetchClientsApi();
  }, [])

  return (
    <>
    </>
  )
}

export const ClientsList = () => {

  return(
    <>
      <PageTitle>{'Customer List'}</PageTitle>
      <ClientListPage />
    </>
  )
}