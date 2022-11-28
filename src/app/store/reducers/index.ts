import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {orderReducer} from "./orderReducer";
import { clientReducer } from "./clientReducer";


export const rootReducer = combineReducers({
    user: userReducer,
    order: orderReducer,
    client: clientReducer,
})

export type RootState = ReturnType<typeof rootReducer>
