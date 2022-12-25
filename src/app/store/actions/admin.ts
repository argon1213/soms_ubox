import {Dispatch} from "redux";
import { AdminAction, AdminActionTypes } from "../types/admin";
import { fetchPeriodsApi, 
    fetchUniversitiesApi, 
    fetchClientsApi, 
    fetchPromotionsApi, 
    fetchPaymentsApi, 
    fetchOrdersApi,
    fetchProductsApi,
    fetchRefApi
} from "../apis/admin";

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

export const fetchProducts = ():any => {
    return async (dispatch: Dispatch<AdminAction>) => {
        try {
            dispatch({type: AdminActionTypes.FETCH_DATA_ADMIN})
            const response = fetchProductsApi();
            const payloadData = (await response).data;
            dispatch({type: AdminActionTypes.FETCH_PRODUCTS, payload: payloadData})
        } catch (e) {
            dispatch({
                type: AdminActionTypes.FETCH_PRODUCTS,
                payload: []
            })
        }
    }
}

export const fetchRef = ():any => {
    return async (dispatch: Dispatch<AdminAction>) => {
        try {
            dispatch({type: AdminActionTypes.FETCH_DATA_ADMIN})
            const response = fetchRefApi();
            const payloadData = (await response).data;
            dispatch({type: AdminActionTypes.FETCH_REF, payload: payloadData})
        } catch (e) {
            dispatch({
                type: AdminActionTypes.FETCH_REF,
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

export const fetchPromotions = (params: any):any => {
    return async (dispatch: Dispatch<AdminAction>) => {
        try {
            dispatch({type: AdminActionTypes.FETCH_DATA_ADMIN})
            const response = fetchPromotionsApi(params);
            const payloadData = (await response).data;
            dispatch({type: AdminActionTypes.FETCH_PROMOTIONS, payload: payloadData})
        } catch (e) {
            dispatch({
                type: AdminActionTypes.FETCH_PROMOTIONS,
                payload: []
            })
        }
    }
}

export const fetchPayments = (params: any):any => {
    return async (dispatch: Dispatch<AdminAction>) => {
        try {
            dispatch({type: AdminActionTypes.FETCH_DATA_ADMIN})
            const response = fetchPaymentsApi(params);
            const payloadData = (await response).data;
            dispatch({type: AdminActionTypes.FETCH_PAYMENTS, payload: payloadData})
        } catch (e) {
            dispatch({
                type: AdminActionTypes.FETCH_PAYMENTS,
                payload: []
            })
        }
    }
}

export const fetchOrders = (params: any):any => {
    return async (dispatch: Dispatch<AdminAction>) => {
        try {
            dispatch({type: AdminActionTypes.FETCH_DATA_ADMIN})
            const response = fetchOrdersApi(params);
            const payloadData = (await response).data;
            dispatch({type: AdminActionTypes.FETCH_ORDERS, payload: payloadData})
        } catch (e) {
            dispatch({
                type: AdminActionTypes.FETCH_ORDERS,
                payload: []
            })
        }
    }
}