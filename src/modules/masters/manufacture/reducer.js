import * as Actions from './constants';
const initialState = {
    manufactures: [],
    pager: {},
    createError: null,
    createSuccess: false,
    deleteError: null,
    deleteSuccess: false,
    updateError: null,
    updateSuccess: false,
}

export default function manufactureReducer(state = initialState, action) {
    switch (action.type) {
        /**
         * add manufacture
         */
        case Actions.ADD_MANUFACTURE:
            return {
                ...state,
                createSuccess: false,
                createError: null
            };
        case Actions.ADD_MANUFACTURE_SUCCESS:
            return {
                ...state,
                pager: state.manufactures.concat(action.pager),
                createSuccess: true,
                createError: null
            };
        case Actions.ADD_MANUFACTURE_ERROR:
            return {
                ...state,
                createSuccess: false,
                createError: action.payload
            };
        /**
         * load manufacture
         */
        case Actions.LOAD_MANUFACTURE:
            return {
                ...state
            };
        case Actions.LOAD_MANUFACTURE_SUCCESS:
            return {
                ...state,
                manufactures: action.payload,
                pager: action.pager
            };
        case Actions.LOAD_MANUFACTURE_ERROR:
            return {
                ...state,
                loading: false,
            };
        /**
         * delete manufacture
         */
        case Actions.DELETE_MANUFACTURE:
            return {
                ...state,
                deleteSuccess: false,
                deleteError: null
            };
        case Actions.DELETE_MANUFACTURE_SUCCESS:
            return {
                ...state,
                pager: state.manufactures.filter(item => item.ID !== action.payload),
                deleteSuccess: true,
                deleteError: null
            }
        case Actions.DELETE_MANUFACTURE_ERROR:
            return {
                ...state,
                deleteSuccess: false,
                deleteError: action.error
            }
        /**
         * update manufacture
         */
         case Actions.UPDATE_MANUFACTURE:
            return {
                ...state,
                updateSuccess: false,
                updateError: null
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
                updateSuccess: true,
                updateError: null
            };
        case Actions.UPDATE_MANUFACTURE_ERROR:
            return {
                ...state,
            updateSuccess: false,
            updateError: action.updateError
            };
        default: 
            return state;
    }
}