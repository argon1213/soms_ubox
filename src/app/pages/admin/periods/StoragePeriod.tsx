
import { PageTitle } from "../../../../_metronic/layout/core";
import { ListViewProvider, useListView } from "./core/PeriodsListViewProvider";
import {PeriodsListHeader} from "./components/header/PeriodsListHeader"
import { KTCard } from "../../../../_metronic/helpers";
import { PeriodsTable } from "./table/PeriodsTable";
import { StoragePeriodsAddModal } from "./modals/add-modal/StoragePeriodsAddModal";
import { StoragePeriodsDeleteModal } from "./modals/delete-modal/StoragePeriodsDeleteModal";


const StoragePeriodsListPage = () => {

  const { itemIdForUpdate, itemIdForDelete } = useListView();

  return (
    <div style={{marginTop: '-30px'}}>
      <KTCard>
        <PeriodsListHeader />
        <PeriodsTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <StoragePeriodsAddModal /> }
      {itemIdForDelete !== undefined && <StoragePeriodsDeleteModal /> }
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