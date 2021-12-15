import * as Actions from './constants';
const initialState = {
    loading: false,
    manufactures: [],
    errorData:'',
    successData: false,
    pager: {}
}

export default function manufactureReducer(state = initialState, action) {
    switch (action.type) {
        /**
         * add manufacture
         */
        case Actions.ADD_MANUFACTURE:
            return {
                ...state,
                loading: true,
                errorData: '',
                successData: false,
            };
        case Actions.ADD_MANUFACTURE_SUCCESS:
            return {
                ...state,
                pager: state.manufactures.concat(action.pager),
                loading: false,
                errorData: '',
                successData: true
            };
        case Actions.ADD_MANUFACTURE_ERROR:
            return {
                ...state,
                errorData: action.payload,
                loading: false,
                successData: false,
            };
        /**
         * load manufacture
         */
        case Actions.LOAD_MANUFACTURE:
            return {
                ...state,
                loading: true,
            };
        case Actions.LOAD_MANUFACTURE_SUCCESS:
            return {
                ...state,
                manufactures: action.payload,
                loading: false,
                pager: action.pager
            };
        case Actions.LOAD_MANUFACTURE_ERROR:
            return {
                ...state,
                errorData: action.error,
                loading: false,
            };
        /**
         * delete manufacture
         */
        case Actions.DELETE_MANUFACTURE_SUCCESS:
            return {
                ...state,
                pager: state.manufactures.filter(item => item.ID !== action.payload),
                //manufactures: state.manufactures.filter(item => item.ID !== action.payload),
                successData: false
            }
        case Actions.DELETE_MANUFACTURE_ERROR:
            return {
                ...state,
                successData: false,
                deleteErrorData: action.error,
                errorData: '',
            }
        /**
         * update manufacture
         */
         case Actions.UPDATE_MANUFACTURE:
            return {
                ...state,
                loading: true,
            };
        case Actions.UPDATE_MANUFACTURE_SUCCESS:
            return {
                ...state,
                manufactures: state.manufactures.map(    
                    (items, index) => 
                        items.ID === action.payload[0].ID ? 
                            {...items, Name : action.payload[0].Name }    
                                : items
                    ),
                loading: false,
            };
        case Actions.UPDATE_MANUFACTURE_ERROR:
            return {
                ...state,
                errorData: action.error,
                loading: false,
            };
        default: 
            return state;
    }
}