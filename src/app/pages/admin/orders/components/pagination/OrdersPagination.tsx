import React from "react"
import { useDispatch } from "react-redux"
import { Pagination } from "antd"
import { useOrdersListView } from "../../core/OrdersListViewProvider"
import { fetchOrders } from "../../../../../store/actions/admin"

export const OrdersPagination: React.FC = () => {

  const dispatch = useDispatch();
  const { uid, pagination, filterData } = useOrdersListView();

  const onChangeHandler = (page: number, pageSize:number) => {
    dispatch(fetchOrders({
      filterData,
      uid,
      ...pagination,
      page: page,
      perPage: pageSize,
    }))
  };

  const showTotalHandler = (total:number, range:[number, number]) => {
    return `${range[0]}-${range[1]} of ${total} items`
  };

  return (
    <>
      <Pagination 
        defaultCurrent={1} 
        total={pagination.total} 
        current={pagination.page}
        pageSize={pagination.perPage}
        showSizeChanger 
        pageSizeOptions={[10, 15, 20, 30]}
        onChange={onChangeHandler}
        showTotal={showTotalHandler}
      />
    </>
  )
}