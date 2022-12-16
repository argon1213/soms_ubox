import { PageTitle } from "../../../../_metronic/layout/core";
import { OrdersListViewProvider, useOrdersListView } from "./core/OrdersListViewProvider";
import {OrdersListHeader} from "./components/header/OrdersListHeader"
import { KTCard } from "../../../../_metronic/helpers";
import { OrdersTable } from "./table/OrdersTable";
import { OrdersAddModal } from "./modals/add-modal/OrdersAddModal";
import { OrdersDeleteModal } from "./modals/delete-modal/OrdersDeleteModal";
import { LoadingSpinner } from "../components/spinner/LoadingSpinner";

const OrdersListPage = () => {

  const { itemIdForUpdate, itemIdForDelete, isLoading } = useOrdersListView();

  return (
    <div style={{marginTop: '-30px'}}>
      <KTCard>
        <OrdersListHeader />
        <OrdersTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <OrdersAddModal /> }
      {itemIdForDelete !== undefined && <OrdersDeleteModal /> }
      {isLoading && <LoadingSpinner />}
    </div>
  )
}

export const OrdersList = () => {

  return(
    <>
      <PageTitle>{'Orders List'}</PageTitle>
      <OrdersListViewProvider>
        <OrdersListPage />
      </OrdersListViewProvider>
    </>
  )
}