export interface AdminState {
  universities: any[];
  products: any[],
  ref: any,
  periods: any[],
  clients: any[],
  promotions: any[],
  payments: any[],
  orders: any[],
  pagination: any,
  loading: boolean;
  error: null | string;
}

export enum AdminActionTypes {
  FETCH_DATA_ADMIN = 'FETCH_DATA_ADMIN',
  FETCH_UNVERSITIES = 'FETCH_UNVERSITIES',
  FETCH_PRODUCTS = 'FETCH_PRODUCTS',
  FETCH_PERIODS = 'FETCH_PERIODS',
  FETCH_CLIENTS = 'FETCH_CLIENTS',
  FETCH_PROMOTIONS = 'FETCH_PROMOTIONS',
  FETCH_PAYMENTS = 'FETCH_PAYMENTS',
  FETCH_ORDERS = 'FETCH_ORDERS',
  FETCH_REF = 'FETCH_REF',
}
interface FetchDataAdminAction {
  type: AdminActionTypes.FETCH_DATA_ADMIN;
}
interface FetchUniversities {
  type: AdminActionTypes.FETCH_UNVERSITIES;
  payload: any;
}
interface FetchProducts {
  type: AdminActionTypes.FETCH_PRODUCTS;
  payload: any;
}
interface FetchRef {
  type: AdminActionTypes.FETCH_REF;
  payload: any;
}
interface fetchPeriods {
  type: AdminActionTypes.FETCH_PERIODS;
  payload: any;
}
interface fetchClients {
  type: AdminActionTypes.FETCH_CLIENTS;
  payload: any;
}
interface fetchPromotions {
  type: AdminActionTypes.FETCH_PROMOTIONS;
  payload: any;
}
interface fetchPayments {
  type: AdminActionTypes.FETCH_PAYMENTS;
  payload: any;
}
interface fetchOrders {
  type: AdminActionTypes.FETCH_ORDERS;
  payload: any;
}


export type AdminAction =
  FetchDataAdminAction
  | FetchUniversities
  | FetchProducts
  | fetchPeriods
  | fetchClients
  | fetchPromotions
  | fetchPayments
  | fetchOrders
  | FetchRef