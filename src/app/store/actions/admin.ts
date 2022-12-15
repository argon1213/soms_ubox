import {Dispatch} from "redux";
import { AdminAction, AdminActionTypes } from "../types/admin";
import { fetchPeriodsApi, fetchUniversitiesApi, fetchClientsApi } from "../apis/admin";

export const fetchUniversities = ():any => {
  return async (dispatch: Dispatch<AdminAction>) => {
      try {
          dispatch({type: AdminActionTypes.FETCH_DATA_ADMIN})
          const response = fetchUniversitiesApi();
          const payloadData = (await response).data;
          dispatch({type: AdminActionTypes.FETCH_UNVERSITIES, payload: payloadData})
      } catch (e) {
          dispatch({
              type: AdminActionTypes.FETCH_UNVERSITIES,
              payload: []
          })
      }
  }
}

export const fetchPeriods = (params: any):any => {
    return async (dispatch: Dispatch<AdminAction>) => {
        try {
            dispatch({type: AdminActionTypes.FETCH_DATA_ADMIN})
            const response = fetchPeriodsApi(params);
            const payloadData = (await response).data;
            dispatch({type: AdminActionTypes.FETCH_PERIODS, payload: payloadData})
        } catch (e) {
            dispatch({
                type: AdminActionTypes.FETCH_PERIODS,
                payload: []
            })
        }
    }
}

export const fetchClients = (params: any):any => {
    return async (dispatch: Dispatch<AdminAction>) => {
        try {
            dispatch({type: AdminActionTypes.FETCH_DATA_ADMIN})
            const response = fetchClientsApi(params);
            const payloadData = (await response).data;
            dispatch({type: AdminActionTypes.FETCH_CLIENTS, payload: payloadData})
        } catch (e) {
            dispatch({
                type: AdminActionTypes.FETCH_CLIENTS,
                payload: []
            })
        }
    }
}