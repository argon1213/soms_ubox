import {FC, useState, useEffect, createContext, useContext, useMemo, Dispatch, SetStateAction} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { WithChildren } from '../../../../../_metronic/helpers';
import { RootState } from '../../../../store/reducers';
import { fetchOrders } from '../../../../store/actions/admin';
import { useParams } from 'react-router-dom';

type pagination = {
  total: number,
  perPage: number,
  page: number,
  orderBy: string | undefined,
  sort: string | undefined,
};

type client = {
  id?: number;
  name?: string,
  email?: string,
  contact?: number | null,
  wechat?: string,
  student_id?: string,
  address1?: string,
}

type paymentStatus = {
  code?: string,
}

type ListViewContextProps = {
  uid?: string;
  data: {
    id?: number;
    code?: string,
    emptyout_location_other?: string,
    emptyout_date_other?: string,
    emptyout_time_other?: string,
    checkin_location_other?: string,
    checkin_date_other?: string,
    checkin_time_other?: string,
    checkout_location_other?: string,
    checkout_date_other?: string,
    checkout_time_other?: string,
    special_instruction?: string,
    client: client,
    status: paymentStatus,
  }[];
  selected: any[];
  setSelected: Dispatch<SetStateAction<any[]>>;
  itemIdForUpdate: undefined | null | number;
  setItemIdForUpdate: Dispatch<SetStateAction<undefined | null | number>>;
  clientIdForUpdate: undefined | null | number;
  setClientIdForUpdate: Dispatch<SetStateAction<undefined | null | number>>;
  orderIdForUpdate: undefined | null | number;
  setOrderIdForUpdate: Dispatch<SetStateAction<undefined | null | number>>;
  itemIdForDelete: undefined | null | number | any[];
  setItemIdForDelete: Dispatch<SetStateAction<undefined | null | number | any[]>>;
  pagination: pagination;
  setPagination: Dispatch<SetStateAction<pagination>>;
  isAllSelected: boolean;
  isLoading: boolean;
}

const initialListView = {
  data: [],
  selected: [],
  setSelected: () => {},
  itemIdForUpdate: undefined,
  setItemIdForUpdate: () => {},
  clientIdForUpdate: undefined,
  setClientIdForUpdate: () => {},
  orderIdForUpdate: undefined,
  setOrderIdForUpdate: () => {},
  itemIdForDelete: undefined,
  setItemIdForDelete: () => {},
  pagination: {
    total: 10,
    perPage: 10,
    page: 1,
    orderBy: undefined,
    sort: undefined,
  },
  setPagination: () => {},
  isAllSelected: false,
  isLoading: false,
}

const ListViewContext = createContext<ListViewContextProps>(initialListView);

const calculateIsAllDataSelected = (__data: any[], __selected: any[]) => {
  if(!__data) {
    return false;
  }
  return __data.length > 0 && __data.length === __selected.length;
}


const OrdersListViewProvider:FC<WithChildren> = ({children}) => {

  const {uid} = useParams();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(Array(0));
  const [itemIdForUpdate, setItemIdForUpdate] = useState<undefined | null | number>(initialListView.itemIdForUpdate);
  const [itemIdForDelete, setItemIdForDelete] = useState<undefined | null | number | any[]>(initialListView.itemIdForUpdate);
  const [clientIdForUpdate, setClientIdForUpdate] = useState<undefined | null | number>(initialListView.clientIdForUpdate);
  const [orderIdForUpdate, setOrderIdForUpdate] = useState<undefined | null | number>(initialListView.orderIdForUpdate);
  const [pagination, setPagination] = useState<pagination>(initialListView.pagination);
  const isLoading = useSelector((state:RootState) => state.admin.loading);
  const data = useSelector((state:RootState) => state.admin.orders);
  const page = useSelector((state:RootState) => state.admin.pagination);
  // const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data), [isLoading, data])
  const isAllSelected = useMemo(() => calculateIsAllDataSelected(data, selected), [data, selected]);

  useEffect(() => {
    dispatch(fetchOrders({
      uid: uid,
      total: 10,
      perPage: 10,
      page: 1,
      orderBy: undefined,
      sort: undefined,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  useEffect(() => {
    setPagination({
      ...pagination,
      ...page,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <ListViewContext.Provider
      value={{
        uid,
        data,
        selected,
        setSelected,
        itemIdForUpdate,
        setItemIdForUpdate,
        clientIdForUpdate,
        setClientIdForUpdate,
        orderIdForUpdate,
        setOrderIdForUpdate,
        itemIdForDelete,
        setItemIdForDelete,
        pagination,
        setPagination,
        isAllSelected,
        isLoading,
      }}
    >
      {children}
    </ListViewContext.Provider>
  )
}

const useOrdersListView = () => useContext(ListViewContext)

export {OrdersListViewProvider, useOrdersListView}
