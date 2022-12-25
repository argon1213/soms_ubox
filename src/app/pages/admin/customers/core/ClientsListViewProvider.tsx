import {FC, useState, useEffect, createContext, useContext, useMemo, Dispatch, SetStateAction} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { WithChildren } from '../../../../../_metronic/helpers';
import { RootState } from '../../../../store/reducers';
import { fetchClients } from '../../../../store/actions/admin';

type pagination = {
  total: number,
  perPage: number,
  page: number,
  orderBy: string | undefined,
  sort: string | undefined,
};

type ListViewContextProps = {
  data: {
    id?: number;
    name?: string,
    email?: string,
    contact?: number | null,
    wechat?: string,
    student_id?: string,
    address1?: string,
    university_id?: number,
  }[];
  selected: any[];
  setSelected: Dispatch<SetStateAction<any[]>>;
  itemIdForUpdate: undefined | null | number;
  setItemIdForUpdate: Dispatch<SetStateAction<undefined | null | number>>;
  itemIdForDelete: undefined | null | number | any[];
  setItemIdForDelete: Dispatch<SetStateAction<undefined | null | number | any[]>>;
  pagination: pagination;
  setPagination: Dispatch<SetStateAction<pagination>>;
  isAllSelected: boolean;
  isLoading: boolean;
  setFilterData: Dispatch<SetStateAction<any>>;
  filterData: {
    name: string,
    email: string,
    contact: string,
    wechat: string,
    student_id: string,
  };
  fetchClientsFunc: Function,
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
  setFilterData: () => {},
  filterData: {
    name: "",
    email: "",
    contact: "",
    wechat: "",
    student_id: "",
  },
  fetchClientsFunc: () => {},
}

const ListViewContext = createContext<ListViewContextProps>(initialListView);

const calculateIsAllDataSelected = (__data: any[], __selected: any[]) => {
  if(!__data) {
    return false;
  }
  return __data.length > 0 && __data.length === __selected.length;
}


const ClientsListViewProvider:FC<WithChildren> = ({children}) => {

  const dispatch = useDispatch();
  const [selected, setSelected] = useState(Array(0));
  const [itemIdForUpdate, setItemIdForUpdate] = useState<undefined | null | number>(initialListView.itemIdForUpdate);
  const [itemIdForDelete, setItemIdForDelete] = useState<undefined | null | number | any[]>(initialListView.itemIdForUpdate);
  const [pagination, setPagination] = useState<pagination>(initialListView.pagination);
  const isLoading = useSelector((state:RootState) => state.admin.loading);
  const data = useSelector((state:RootState) => state.admin.clients);
  const page = useSelector((state:RootState) => state.admin.pagination);
  // const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data), [isLoading, data])
  const isAllSelected = useMemo(() => calculateIsAllDataSelected(data, selected), [data, selected]);
  const [filterData, setFilterData] = useState(initialListView.filterData);

  useEffect(() => {
    dispatch(fetchClients({
      filterData,
      total: 10,
      perPage: 10,
      page: 1,
      orderBy: undefined,
      sort: undefined,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPagination({
      ...pagination,
      ...page,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchClientsFunc = () => {
    dispatch(fetchClients({
      filterData,
      ...pagination
    }));
  }

  return (
    <ListViewContext.Provider
      value={{
        data,
        selected,
        setSelected,
        itemIdForUpdate,
        setItemIdForUpdate,
        itemIdForDelete,
        setItemIdForDelete,
        pagination,
        setPagination,
        isAllSelected,
        isLoading,
        setFilterData,
        filterData,
        fetchClientsFunc,
      }}
    >
      {children}
    </ListViewContext.Provider>
  )
}

const useClientsListView = () => useContext(ListViewContext)

export {ClientsListViewProvider, useClientsListView}
