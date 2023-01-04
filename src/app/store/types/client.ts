export interface ClientState {
  client: any;
  orders: any[];
  products: any[];
  currentOrder: any;
  loading: boolean;
  error: null | string;
  page: number;
  total: number;
  limit: number;
}

export enum ClientActionTypes {
  FETCH_DATA = 'FETCH_DATA',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  FETCH_ACCOUNT = 'FETCH_ACCOUNT',
  FETCH_ORDERS = 'FETCH_ORDERS',
  UPDATE_ORDER = 'UPDATE_ORDER',
  GET_PRODUCTS = 'GET_PRODUCTS',
  FETCH_CURRENT_ORDER = 'FETCH_CURRENT_ORDER',
}
interface FetchDataAction {
  type: ClientActionTypes.FETCH_DATA;
}
interface UpdateAccountAction {
  type: ClientActionTypes.UPDATE_ACCOUNT;
  payload: any;
}
interface FetchAccountAction {
  type: ClientActionTypes.FETCH_ACCOUNT;
  payload: any;
}
interface FetchOrdersAction {
  type: ClientActionTypes.FETCH_ORDERS;
  payload: any;
}
interface UpdateOrder {
  type: ClientActionTypes.UPDATE_ORDER;
  payload: any;
}
interface GetProducts {
  type: ClientActionTypes.GET_PRODUCTS;
  payload: any;
}
interface FetchCurrentOrder {
  type: ClientActionTypes.FETCH_CURRENT_ORDER;
  payload: any;
}

export type ClientAction =
  FetchDataAction
  | UpdateAccountAction
  | FetchAccountAction
  | FetchOrdersAction
  | UpdateOrder
  | GetProducts
  | FetchCurrentOrder
