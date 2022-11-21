import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {orderReducer} from "./orderReducer";


export const rootReducer = combineReducers({
    user: userReducer,
    order: orderReducer
})

export type RootState = ReturnType<typeof rootReducer>
