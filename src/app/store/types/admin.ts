export interface AdminState {
  universities: any[];
  periods: any,
  loading: boolean;
  error: null | string;
  page: number;
  limit: number;
}

export enum AdminActionTypes {
  FETCH_DATA_ADMIN = 'FETCH_DATA_ADMIN',
  FETCH_UNVERSITIES = 'FETCH_UNVERSITIES',
  FETCH_PERIODS = 'FETCH_PERIODS',
  
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


export type AdminAction =
  FetchDataAdminAction
  | FetchUniversities
  | fetchPeriods