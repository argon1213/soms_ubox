import {Dispatch} from "redux";
import { ClientAction, ClientActionTypes } from "../types/client";
import { updateAccountApi, fetchAccountApi, fetchOrdersApi, updateOrderApi, fetchCurrentOrderApi } from "../apis/client";
import { getProducts } from "../apis/ordering";

type account = {
  id: string,
  name: string,
  contact: string,
  university_id: string,
  student_id: string,
  wechat: string,
}

type userId = {
    id: string,
}
type updateOrderInfo = {
    id: number,
    code: number,
    client_id: number,
    emptyout_date_other: string,
    checkin_date_other: string,
    checkout_date_other: string,
    emptyout_time_other: string,
    checkin_time_other: string,
    checkout_time_other: string,
}

export const updateAccount = (param: account) => {
  return async (dispatch: Dispatch<ClientAction>) => {
      try {
          dispatch({type: ClientActionTypes.FETCH_DATA})
          const response = updateAccountApi(param);
          const payloadData = (await response).data;
          localStorage.setItem("ubox-user", JSON.stringify(payloadData));
          setTimeout(() => {
              dispatch({type: ClientActionTypes.UPDATE_ACCOUNT, payload: payloadData})
          }, 500)
      } catch (e) {
          dispatch({
              type: ClientActionTypes.UPDATE_ACCOUNT,
              payload: ''
          })
      }
  }
}

export const fetchAccount = (params: userId) => {
    return async(dispatch: Dispatch<ClientAction>) => {
        try {
            const response = fetchAccountApi(params);
            const payloadData = (await response).data;
            localStorage.setItem("ubox-user", JSON.stringify(payloadData));
            dispatch({
                type: ClientActionTypes.FETCH_ACCOUNT,
                payload: payloadData,
            })
        } catch {
            dispatch({
                type: ClientActionTypes.FETCH_ACCOUNT,
                payload: '',
            })
        }
    }
}

export const fetchOrders = (params: userId) => {
    return async(dispatch: Dispatch<ClientAction>) => {
        try {
            dispatch({type: ClientActionTypes.FETCH_DATA})
            const response = fetchOrdersApi(params);
            const payloadData = (await response).data;
            dispatch({
                type: ClientActionTypes.FETCH_ORDERS,
                payload: payloadData,
            })
        } catch {
            dispatch({
                type: ClientActionTypes.FETCH_ORDERS,
                payload: [],
            })
        }
    }
}

export const updateOrder = (params: updateOrderInfo) => {
    return async(dispatch: Dispatch<ClientAction>) => {
        try {
            dispatch({type: ClientActionTypes.FETCH_DATA})
            const response = updateOrderApi(params);
            const payloadData = (await response).data;
            dispatch({
                type: ClientActionTypes.UPDATE_ORDER,
                payload: payloadData,
            })
        } catch {
            dispatch({
                type: ClientActionTypes.UPDATE_ORDER,
                payload: [],
            })
        }
    }
}

export const fetchProducts = () => {
    return async(dispatch: Dispatch<ClientAction>) => {
        try {
            dispatch({type: ClientActionTypes.FETCH_DATA})
            const response = getProducts();
            const payloadData = (await response).data;
            dispatch({
                type: ClientActionTypes.GET_PRODUCTS,
                payload: payloadData,
            })
        } catch {
            dispatch({
                type: ClientActionTypes.GET_PRODUCTS,
                payload: [],
            })
        }
    }
}

export const fetchCurrentOrder = (params: userId) => {
    return async(dispatch: Dispatch<ClientAction>) => {
        try {
            dispatch({type: ClientActionTypes.FETCH_DATA})
            const response = fetchCurrentOrderApi(params);
            const payloadData = (await response).data;
            dispatch({
                type: ClientActionTypes.FETCH_CURRENT_ORDER,
                payload: payloadData,
            })
        } catch {
            dispatch({
                type: ClientActionTypes.FETCH_CURRENT_ORDER,
                payload: [],
            })
        }
    }
}