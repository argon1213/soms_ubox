
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PageTitle } from "../../../../_metronic/layout/core";
import { ListViewProvider, useListView } from "./core/ListViewProvider";
import {PeriodsListHeader} from "./components/header/PeriodsListHeader"
import { fetchPeriods } from "../../../store/actions/admin";
import { KTCard } from "../../../../_metronic/helpers";
import { PeriodsTable } from "./table/PeriodsTable";
import { StoragePeriodsAddModal } from "./modals/add-modal/StoragePeriodsAddModal";
import { StoragePeriodsDeleteModal } from "./modals/delete-modal/StoragePeriodsDeleteModal";


const StoragePeriodsListPage = () => {

  const { itemIdForUpdate, itemIdForDelete } = useListView();

  return (
    <>
      <KTCard>
          <PeriodsListHeader />
          <PeriodsTable />
        </KTCard>
        {itemIdForUpdate !== undefined && <StoragePeriodsAddModal /> }
        {itemIdForDelete !== undefined && <StoragePeriodsDeleteModal /> }
    </>
  )
}

export const StoragePeriodsList = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPeriods());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <>
      <PageTitle>{'Storage Periods List'}</PageTitle>
      <ListViewProvider>
        <StoragePeriodsListPage />
      </ListViewProvider>
    </>
  )
}