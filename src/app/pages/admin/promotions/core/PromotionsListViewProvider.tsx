import {FC, useState, useEffect, createContext, useContext, useMemo, Dispatch, SetStateAction} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { WithChildren } from '../../../../../_metronic/helpers';
import { RootState } from '../../../../store/reducers'
import { fetchPromotions } from '../../../../store/actions/admin';

type pagination = {
  total: number,
  perPage: number,
  page: number,
  orderBy: string | undefined,
  sort: string | undefined,
};

type ListViewContextProps = {
  data: {
    id?: number,
    code?: string,
    name?: string,
    effective_from?: string,
    effective_to?: string,
    items?: any[],
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
  filterData: {
    name: string,
    code: string,
    fromDateStart: string,
    fromDateEnd: string,
    toDateStart: string,
    toDateEnd: string,
  },
  setFilterData: Dispatch<SetStateAction<any>>;
  fetchPromotionFunc: Function;
}

const initialListView = {
  data: [{
    code: "",
    name: "",
    effective_from: "",
    effective_to: "",
    items: [],
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
  filterData: {
    name: "",
    code: "",
    fromDateStart: "",
    fromDateEnd: "",
    toDateStart: "",
    toDateEnd: "",
  },
  setFilterData: () => {},
  fetchPromotionFunc: () => {},
}

const ListViewContext = createContext<ListViewContextProps>(initialListView);

const calculateIsAllDataSelected = (__data: any[], __selected: any[]) => {
  if(!__data) {
    return false;
  }
  return __data.length > 0 && __data.length === __selected.length;
}


const PromotionsListViewProvider:FC<WithChildren> = ({children}) => {

  const dispatch = useDispatch();

  const [selected, setSelected] = useState(Array(0));
  const [itemIdForUpdate, setItemIdForUpdate] = useState<undefined | null | number>(initialListView.itemIdForUpdate);
  const [itemIdForDelete, setItemIdForDelete] = useState<undefined | null | number | any[]>(initialListView.itemIdForUpdate);
  const [pagination, setPagination] = useState<pagination>(initialListView.pagination);
  const isLoading = useSelector((state:RootState) => state.admin.loading);
  const data = useSelector((state:RootState) => state.admin.promotions);
  const page = useSelector((state:RootState) => state.admin.pagination);
  // const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data), [isLoading, data])
  const isAllSelected = useMemo(() => calculateIsAllDataSelected(data, selected), [data, selected]);
  const [filterData, setFilterData] = useState(initialListView.filterData);

  useEffect(() => {
    dispatch(fetchPromotions({
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

  const fetchPromotionFunc = () => {
    dispatch(fetchPromotions({
      filterData,
      ...pagination
    }))
  };

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
        filterData,
        setFilterData,
        fetchPromotionFunc,
      }}
    >
      {children}
    </ListViewContext.Provider>
  )
}

const usePromotionsListView = () => useContext(ListViewContext)

export {PromotionsListViewProvider, usePromotionsListView}
