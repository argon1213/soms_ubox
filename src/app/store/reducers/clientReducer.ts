import { ClientAction, ClientActionTypes, ClientState } from "../types/client";

const initialState: ClientState = {
    client: {},
    orders: [],
    products: [],
    currentOrder: {},
    page: 1,
    error: null,
    limit: 10,
    loading: false
}

export const clientReducer = (state = initialState, action: ClientAction): ClientState => {
    switch (action.type) {
        case ClientActionTypes.FETCH_DATA:
            return {...state, loading: true}
        case ClientActionTypes.UPDATE_ACCOUNT:
            return {...state, loading: false, client: action.payload}
        case ClientActionTypes.FETCH_ACCOUNT:
            return {...state, loading: false, client: action.payload}
        case ClientActionTypes.FETCH_ORDERS:
            return {...state, loading: false, orders: action.payload}
        case ClientActionTypes.UPDATE_ORDER:
            return {...state, loading: false, client: action.payload}
        case ClientActionTypes.GET_PRODUCTS:
            return {...state, loading: false, products: action.payload}
        case ClientActionTypes.FETCH_CURRENT_ORDER:
            return {...state, loading: false, currentOrder: action.payload}
        default:
            return state
    }
}
