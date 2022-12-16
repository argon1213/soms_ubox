
import { PageTitle } from "../../../../_metronic/layout/core";
import { PromotionsListViewProvider, usePromotionsListView } from "./core/PromotionsListViewProvider";
import {PromotionsListHeader} from "./components/header/PromotionsListHeader"
import { KTCard } from "../../../../_metronic/helpers";
import { PromotionsTable } from "./table/PromotionsTable";
import { PromotionsAddModal } from "./modals/add-modal/PromotionsAddModal";
import { PromotionsDeleteModal } from "./modals/delete-modal/PromotionsDeleteModal";
import { LoadingSpinner } from "../components/spinner/LoadingSpinner";

const PromotionsListPage = () => {

  const { itemIdForUpdate, itemIdForDelete, isLoading } = usePromotionsListView();

  return (
    <div style={{marginTop: '-30px'}}>
      <KTCard>
        <PromotionsListHeader />
        <PromotionsTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <PromotionsAddModal /> }
      {itemIdForDelete !== undefined && <PromotionsDeleteModal /> }
      {isLoading && <LoadingSpinner />}
    </div>
  )
}

export const PromotionsList = () => {

  return(
    <>
      <PageTitle>{'Promotions List'}</PageTitle>
      <PromotionsListViewProvider>
        <PromotionsListPage />
      </PromotionsListViewProvider>
    </>
  )
}