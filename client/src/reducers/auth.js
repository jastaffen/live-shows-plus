import { REGISTER_SUCCESS, REGISTER_FAIL, AUTH_ERROR, USER_LOADED } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case USER_LOADED: 
            return {
                ...state,
                isAuthenticaed: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticaed: false,
                loading: false
            }
        default: 
            return state
    }
}
