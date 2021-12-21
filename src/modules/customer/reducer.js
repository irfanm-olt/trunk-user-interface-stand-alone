import * as Actions from './constants';
const isEmpty = require("is-empty");
const initialState = {
    customers: [],
    pager: {},
    editCustomer: '',
    createError: null,
    createSuccess: false,
    deleteError: null,
    deleteSuccess: false,
    updateError: null,
    updateSuccess: false,
}

export default function customerReducer(state = initialState, action) {
    switch (action.type) {
        case Actions.CREATE_CUSTOMER:
            return {
                ...state,
                createSuccess: false,
                createError: null
            };
        case Actions.CREATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                createSuccess: true,
                createError: null
            };
        case Actions.CREATE_CUSTOMER_ERROR:
            return {
                ...state,
                createSuccess: false,
                createError: action.error
            };
        /**
         * update customer
         */
        case Actions.UPDATE_CUSTOMER:
            return {
                ...state,
                updateSuccess: false,
                updateError: null
            };
        case Actions.UPDATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                updateSuccess: true,
                updateError: null
            };
        case Actions.UPDATE_CUSTOMER_ERROR:
            return {
                ...state,
            updateSuccess: false,
            updateError: action.updateError
            };
        case Actions.LOAD_CUSTOMER:
            return {
                ...state,
            };
        case Actions.LOAD_CUSTOMER_SUCCESS:
            return {
                ...state,
                customers: action.payload,
                pager: action.pager
            }
        case Actions.LOAD_CUSTOMER_ERROR:
            return {
                ...state,
            }
        /**
         * LOAD CUSTOMER BY ID
         */
         case Actions.LOAD_CUSTOMER_BY_ID:
            return {
                ...state,
            };
        case Actions.LOAD_CUSTOMER_BY_ID_SUCCESS:
            return {
                ...state,
                editCustomer: action.payload,
            }
        case Actions.LOAD_CUSTOMER_BY_ID_ERROR:
            return {
                ...state,
            }
        /**
         * delete customer
         */
         case Actions.DELETE_CUSTOMER:
            return {
                ...state,
                deleteSuccess: false,
                deleteError: null
            };
        case Actions.DELETE_CUSTOMER_SUCCESS:
            return {
                ...state,
                pager: state.customers.filter(item => item.ID !== action.payload),
                deleteSuccess: true,
                deleteError: null
            }
        case Actions.DELETE_CUSTOMER_ERROR:
            return {
                ...state,
                deleteSuccess: false,
                deleteError: action.error
            }
        default: 
            return state;
    }
}