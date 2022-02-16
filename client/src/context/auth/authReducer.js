import{
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERROR
} from '../types';

const register= (state,action) => {
    switch(action.type){
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:action.payload
            };
        case  REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return{
                ...state,
                ...action.payload,
                isAuthenticated:true,
                loading:false
            };
        case REGISTER_FAIL:
        case  AUTH_ERROR:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false,
                user:null,
                error:action.payload
            };
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                  ...state,
                  token: null,
                  isAuthenticated: false,
                  loading: false,
                  user: null
                };
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
            };
        default:
            return state;
    }
}

export default register;