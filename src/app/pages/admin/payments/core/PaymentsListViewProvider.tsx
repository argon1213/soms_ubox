import {FC, useState, useEffect, createContext, useContext, useMemo, Dispatch, SetStateAction} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { WithChildren } from '../../../../../_metronic/helpers';
import { RootState } from '../../../../store/reducers';
import { fetchPayments } from '../../../../store/actions/admin';

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

type order = {
  id?: number,
  client?: client,
}

type ListViewContextProps = {
  orderId?: string,
  data: {
    id?: number | null;
    name?: string,
    email?: string,
    contact?: number | null,
    wechat?: string,
    student_id?: string,
    address1?: string,
    order?: order,
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
  filterData: {
    order_id: string,
    amount: string,
  };
  setFilterData: Dispatch<SetStateAction<any>>;
  fetchPaymentsFunc: Function;
}

const initialListView = {
  data: [{
    name: "",
    email: "",
    contact: null,
    wechat: "",
    student_id: "",
    address: "",
  }],
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
  filterData: {
    order_id: "",
    amount: "",
  },
  setFilterData: () => {},
  fetchPaymentsFunc: () => {},
}

const ListViewContext = createContext<ListViewContextProps>(initialListView);

const calculateIsAllDataSelected = (__data: any[], __selected: any[]) => {
  if(!__data) {
    return false;
  }
  return __data.length > 0 && __data.length === __selected.length;
}


const PaymentsListViewProvider:FC<WithChildren> = ({children}) => {

  const dispatch = useDispatch();
  const {orderId} = useParams();
  const [selected, setSelected] = useState(Array(0));
  const [itemIdForUpdate, setItemIdForUpdate] = useState<undefined | null | number>(initialListView.itemIdForUpdate);
  const [itemIdForDelete, setItemIdForDelete] = useState<undefined | null | number | any[]>(initialListView.itemIdForUpdate);
  const [clientIdForUpdate, setClientIdForUpdate] = useState<undefined | null | number>(initialListView.clientIdForUpdate);
  const [orderIdForUpdate, setOrderIdForUpdate] = useState<undefined | null | number>(initialListView.orderIdForUpdate);
  const [pagination, setPagination] = useState<pagination>(initialListView.pagination);
  const isLoading = useSelector((state:RootState) => state.admin.loading);
  const data = useSelector((state:RootState) => state.admin.payments);
  const page = useSelector((state:RootState) => state.admin.pagination);
  // const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data), [isLoading, data])
  const isAllSelected = useMemo(() => calculateIsAllDataSelected(data, selected), [data, selected]);
  const [filterData, setFilterData] = useState(initialListView.filterData);

  useEffect(() => {
    dispatch(fetchPayments({
      filterData,
      orderId,
      total: 10,
      perPage: 10,
      page: 1,
      orderBy: undefined,
      sort: undefined,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  useEffect(() => {
    setPagination({
      ...pagination,
      ...page,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchPaymentsFunc = () => {
    dispatch(fetchPayments({
      filterData,
      orderId,
      ...pagination,
    }));
  }

  return (
    <ListViewContext.Provider
      value={{
        orderId,
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
        filterData,
        setFilterData,
        fetchPaymentsFunc
      }}
    >
      {children}
    </ListViewContext.Provider>
  )
}

const usePaymentsListView = () => useContext(ListViewContext)

export {PaymentsListViewProvider, usePaymentsListView}
