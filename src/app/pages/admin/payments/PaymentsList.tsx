
import { PageTitle } from "../../../../_metronic/layout/core";
import { PaymentsListViewProvider, usePaymentsListView } from "./core/PaymentsListViewProvider";
import {PaymentsListHeader} from "./components/header/PaymentsListHeader"
import { KTCard } from "../../../../_metronic/helpers";
import { PaymentsTable } from "./table/PaymentsTable";
import { PaymentsAddModal } from "./modals/add-modal/PaymentsAddModal";
import { PaymentsDeleteModal } from "./modals/delete-modal/PaymentsDeleteModal";
import { PaymentsClientEditModal } from "./modals/edit-modal/PaymentsClientEditModal";
import { LoadingSpinner } from "../components/spinner/LoadingSpinner";

const PaymentsListPage = () => {

  const { itemIdForUpdate, itemIdForDelete, clientIdForUpdate, isLoading } = usePaymentsListView();

  return (
    <div style={{marginTop: '-30px'}}>
      <KTCard>
        <PaymentsListHeader />
        <PaymentsTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <PaymentsAddModal /> }
      {itemIdForDelete !== undefined && <PaymentsDeleteModal /> }
      {clientIdForUpdate !== undefined && <PaymentsClientEditModal /> }
      {isLoading && <LoadingSpinner />}
    </div>
  )
}

export const PaymentsList = () => {

  return(
    <>
      <PageTitle>{'Payments List'}</PageTitle>
      <PaymentsListViewProvider>
        <PaymentsListPage />
      </PaymentsListViewProvider>
    </>
  )
}