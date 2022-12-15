export interface AdminState {
  universities: any[];
  periods: any[],
  clients: any[],
  pagination: any,
  loading: boolean;
  error: null | string;
}

export enum AdminActionTypes {
  FETCH_DATA_ADMIN = 'FETCH_DATA_ADMIN',
  FETCH_UNVERSITIES = 'FETCH_UNVERSITIES',
  FETCH_PERIODS = 'FETCH_PERIODS',
  FETCH_CLIENTS = 'FETCH_CLIENTS',
  
}
interface FetchDataAdminAction {
  type: AdminActionTypes.FETCH_DATA_ADMIN;
}
interface FetchUniversities {
  type: AdminActionTypes.FETCH_UNVERSITIES;
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


export type AdminAction =
  FetchDataAdminAction
  | FetchUniversities
  | fetchPeriods
  | fetchClients