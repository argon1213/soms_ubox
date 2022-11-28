import {UserAction, UserActionTypes} from "../types/user";
import {Dispatch} from "redux";
import axios from "axios";
// import { login } from "../apis/auth";
// import { string } from "yup";

// type user =  {
//     email: string,
//     password: string,
// }

export const fetchUsers = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USERS})
            const response = await axios.get('https://jsonplaceholder.typicode.com/users')
            setTimeout(() => {
                dispatch({type: UserActionTypes.FETCH_USERS_SUCCESS, payload: response.data})
            }, 500)
        } catch (e) {
            dispatch({
                type: UserActionTypes.FETCH_USERS_ERROR,
                payload: ''
            })
        }
    }
}

// export const signIn = (user: user ) => {
//     return async (dispatch: Dispatch<UserAction>) => {
//         try {
//             const response = await login(user);
//         }
//     }
// }
