import { AdminAction, AdminActionTypes, AdminState } from "../types/admin";

const initialState: AdminState = {
    universities: [],
    products: [],
    ref: {},
    periods: [],
    clients: [],
    promotions: [],
    payments: [],
    orders: [],
    pagination: {},
    error: null,
    loading: false
}


export const adminReducer = (state = initialState, action: AdminAction): AdminState => {
    switch (action.type) {
        case AdminActionTypes.FETCH_DATA_ADMIN:
            return {...state, loading: true}
        case AdminActionTypes.FETCH_UNVERSITIES:
            return {...state, loading: false, universities: action.payload}
        case AdminActionTypes.FETCH_REF:
            return {...state, loading: false, ref: action.payload}
        case AdminActionTypes.FETCH_PRODUCTS:
            return{...state, loading: false, products: action.payload}
        case AdminActionTypes.FETCH_PERIODS:
            return {...state, loading: false,
                periods: action.payload.data,
                pagination: action.payload.pagination
            }
        case AdminActionTypes.FETCH_CLIENTS:
            return {...state, loading: false, 
                clients: action.payload.data,
                pagination: action.payload.pagination
            }
        case AdminActionTypes.FETCH_PROMOTIONS:
            return {...state, loading: false,
                promotions: action.payload.data,
                pagination: action.payload.pagination
            }
        case AdminActionTypes.FETCH_PAYMENTS:
            return {...state, loading: false,
                payments: action.payload.data,
                pagination: action.payload.pagination
            }
        case AdminActionTypes.FETCH_ORDERS:
            return {...state, loading: false,
                orders: action.payload.data,
                pagination: action.payload.pagination
            }
        default:
            return state
    }
}