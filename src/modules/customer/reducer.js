import * as Actions from './constants';
const isEmpty = require("is-empty");
const initialState = {
    loading: false,
    success: {},
    response: {},
    customers: [],
    pager: {}
}

export default function customerReducer(state = initialState, action) {
    switch (action.type) {
        case Actions.CREATE_CUSTOMER:
            return {
                ...state,
                loading: true,
                response: !isEmpty(action.payload)
            };
        case Actions.CREATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                response: !isEmpty(action.payload),
                loading: false
            };
        case Actions.LOAD_CUSTOMER:
            return {
                ...state,
                loading: true,
            };
        case Actions.LOAD_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: action.payload,
                error: '',
                pager: action.pager
            }
        case Actions.LOAD_CUSTOMER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        /**
         * delete customer
         */
        case Actions.DELETE_CUSTOMER_SUCCESS:
            return {
                ...state,
                pager: state.customers.filter(item => item.ID !== action.payload),
                successData: false
            }
        case Actions.DELETE_CUSTOMER_ERROR:
            return {
                ...state,
                successData: false,
                deleteErrorData: action.error,
                errorData: '',
            }
        default: 
            return state;
    }
}