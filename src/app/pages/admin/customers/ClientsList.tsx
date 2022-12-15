
import { PageTitle } from "../../../../_metronic/layout/core";
import { ClientsListViewProvider, useClientsListView } from "./core/ClientsListViewProvider";
import {ClientsListHeader} from "./components/header/ClientsListHeader"
import { KTCard } from "../../../../_metronic/helpers";
import { ClientsTable } from "./table/ClientsTable";
import { ClientsAddModal } from "./modals/add-modal/ClientsAddModal";
import { ClientsDeleteModal } from "./modals/delete-modal/ClientsDeleteModal";


const ClientsListPage = () => {

  const { itemIdForUpdate, itemIdForDelete } = useClientsListView();

  return (
    <div style={{marginTop: '-30px'}}>
      <KTCard>
        <ClientsListHeader />
        <ClientsTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <ClientsAddModal /> }
      {itemIdForDelete !== undefined && <ClientsDeleteModal /> }
    </div>
  )
}

export const ClientsList = () => {

  return(
    <>
      <PageTitle>{'Customer List'}</PageTitle>
      <ClientsListViewProvider>
        <ClientsListPage />
      </ClientsListViewProvider>
    </>
  )
}