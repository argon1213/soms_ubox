import {Dispatch} from "redux";
import { AdminAction, AdminActionTypes } from "../types/admin";
import { fetchPeriodsApi, fetchUniversitiesApi } from "../apis/admin";

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

export const fetchPeriods = ():any => {
    return async (dispatch: Dispatch<AdminAction>) => {
        try {
            dispatch({type: AdminActionTypes.FETCH_DATA_ADMIN})
            const response = fetchPeriodsApi();
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
