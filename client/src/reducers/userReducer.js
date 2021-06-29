import { LOAD_USER, LOGIN, LOG_OUT, REGISTER } from "../actionTypes/user";

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false
}

const userReducer = (state=initialState, {type, payload}) => {
    switch(type){
        case LOGIN:
        case REGISTER:
        case LOAD_USER:
            return {...state, user: payload.user, token: payload.token, isAuthenticated: true}
        case LOG_OUT:
            return initialState
        default:
            return state;
    }
}

export default userReducer