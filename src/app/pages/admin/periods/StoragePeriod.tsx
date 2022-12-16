
import { PageTitle } from "../../../../_metronic/layout/core";
import { ListViewProvider, useListView } from "./core/PeriodsListViewProvider";
import {PeriodsListHeader} from "./components/header/PeriodsListHeader"
import { KTCard } from "../../../../_metronic/helpers";
import { PeriodsTable } from "./table/PeriodsTable";
import { StoragePeriodsAddModal } from "./modals/add-modal/StoragePeriodsAddModal";
import { StoragePeriodsDeleteModal } from "./modals/delete-modal/StoragePeriodsDeleteModal";
import { LoadingSpinner } from "../components/spinner/LoadingSpinner";

const StoragePeriodsListPage = () => {

  const { itemIdForUpdate, itemIdForDelete, isLoading } = useListView();

  return (
    <div style={{marginTop: '-30px'}}>
      <KTCard>
        <PeriodsListHeader />
        <PeriodsTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <StoragePeriodsAddModal /> }
      {itemIdForDelete !== undefined && <StoragePeriodsDeleteModal /> }
      {isLoading && <LoadingSpinner />}
    </div>
  )
}

export const StoragePeriodsList = () => {

  return(
    <>
      <PageTitle>{'Storage Periods List'}</PageTitle>
      <ListViewProvider>
        <StoragePeriodsListPage />
      </ListViewProvider>
    </>
  )
}