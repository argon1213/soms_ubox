import { AdminAction, AdminActionTypes, AdminState } from "../types/admin";

const initialState: AdminState = {
    universities: [],
    periods: {
        data: [],
        pagination: {
            
        },
    },
    page: 1,
    error: null,
    limit: 10,
    loading: false
}


export const adminReducer = (state = initialState, action: AdminAction): AdminState => {
    switch (action.type) {
        case AdminActionTypes.FETCH_DATA_ADMIN:
            return {...state, loading: true}
        case AdminActionTypes.FETCH_UNVERSITIES:
            return {...state, loading: false, universities: action.payload}
        case AdminActionTypes.FETCH_PERIODS:
            return {...state, loading: false,
                periods: {
                    data: action.payload,
                    pagination: {},
                }}
        default:
            return state
    }
}