import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {orderReducer} from "./orderReducer";
import { clientReducer } from "./clientReducer";
import { adminReducer } from "./adminReducer";


export const rootReducer = combineReducers({
    user: userReducer,
    order: orderReducer,
    client: clientReducer,
    admin: adminReducer,
})

export type RootState = ReturnType<typeof rootReducer>
