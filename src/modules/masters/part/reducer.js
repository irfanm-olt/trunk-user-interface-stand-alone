import * as Actions from './constants';
const initialState = {
    loading: false,
    parts: [],
    pager: {}
}

export default function partReducer(state = initialState, action) {
    switch (action.type) {
        /**
         * add car
         */
        case Actions.ADD_PART:
            return {
                ...state,
                loading: true,
            };
        case Actions.ADD_PART_SUCCESS:
            return {
                ...state,
                //parts: state.parts.concat(action.payload),
                pager: state.parts.concat(action.pager),
                loading: false,
            };
        case Actions.ADD_PART_ERROR:
            return {
                ...state,
                data: action.payload,
                loading: false,
            };
        /**
         * load master
         */
        case Actions.LOAD_PART:
            return {
                ...state,
                loading: true,
            };
        case Actions.LOAD_PART_SUCCESS:
            return {
                ...state,
                parts: action.partName,
                partSection: action.partSection,
                loading: false,
                pager: action.pager
            };
        case Actions.LOAD_PART_ERROR:
            return {
                ...state,
                data: action.payload,
                loading: false,
            };
        /**
         * DELETE PART
         */
         case Actions.DELETE_PART_SUCCESS:
            return {
                ...state,
                //parts: state.parts.filter(item => item.ID !== action.payload),
                pager: state.parts.filter(item => item.ID !== action.payload),
                successData: false
            }
        case Actions.DELETE_PART_ERROR:
            return {
                ...state,
                successData: false,
                deleteErrorData: action.error,
                errorData: '',
            }
        /**
         * UPDATE PART
         */
        case Actions.UPDATE_PART:
            return {
                ...state,
                loading: true,
            };
        case Actions.UPDATE_PART_SUCCESS:
            return {
                ...state,
                pager: state.parts.map(    
                    (items, index) => 
                        items.ID === action.payload[0].ID ? 
                            {...items, Name : action.payload[0].Name }    
                                : items
                    ),
                loading: false,
            };
        case Actions.UPDATE_PART_ERROR:
            return {
                ...state,
                errorData: action.error,
                loading: false,
            };
        default: 
            return state;
    }
}