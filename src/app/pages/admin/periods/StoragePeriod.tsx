
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PageTitle } from "../../../../_metronic/layout/core";
import { ListViewProvider } from "./core/ListViewProvider";
import {PeriodsListHeader} from "./components/header/PeriodsListHeader"
import { fetchPeriods } from "../../../store/actions/admin";
import { KTCard } from "../../../../_metronic/helpers";
import { PeriodsTable } from "./table/PeriodsTable";


const StoragePeriodsListPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPeriods());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <ListViewProvider>
        <KTCard>
          <PeriodsListHeader />
          <PeriodsTable />
        </KTCard>
      </ListViewProvider>
    </>
  )
}

export const StoragePeriodsList = () => {

  return(
    <>
      <PageTitle>{'Storage Periods List'}</PageTitle>
      <StoragePeriodsListPage />
    </>
  )
}