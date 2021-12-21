import * as Actions from './constants';
const initialState = {
    parts: [],
    pager: {},
    createError: null,
    createSuccess: false,
    deleteError: null,
    deleteSuccess: false,
    updateError: null,
    updateSuccess: false,
}

export default function partReducer(state = initialState, action) {
    switch (action.type) {
        /**
         * add car
         */
        case Actions.ADD_PART:
            return {
                ...state,
                createSuccess: false,
                createError: null
            };
        case Actions.ADD_PART_SUCCESS:
            return {
                ...state,
                pager: state.parts.concat(action.pager),
                createSuccess: true,
                createError: null
            };
        case Actions.ADD_PART_ERROR:
            return {
                ...state,
                data: action.payload,
                createError: action.error
            };
        /**
         * load master
         */
        case Actions.LOAD_PART:
            return {
                ...state,
            };
        case Actions.LOAD_PART_SUCCESS:
            return {
                ...state,
                parts: action.partName,
                partSection: action.partSection,
                pager: action.pager
            };
        case Actions.LOAD_PART_ERROR:
            return {
                ...state,
                data: action.payload,
            };
        /**
         * DELETE PART
         */
         case Actions.DELETE_PART:
            return {
                ...state,
                deleteSuccess: false,
                deleteError: null
            };
         case Actions.DELETE_PART_SUCCESS:
            return {
                ...state,
                pager: state.parts.filter(item => item.ID !== action.payload),
                deleteSuccess: true,
                deleteError: null
            }
        case Actions.DELETE_PART_ERROR:
            return {
                ...state,
                deleteSuccess: false,
                deleteError: action.error
            }
        /**
         * UPDATE PART
         */
        case Actions.UPDATE_PART:
            return {
                ...state,
                updateSuccess: false,
                updateError: null
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
                updateSuccess: true,
                updateError: null
            };
        case Actions.UPDATE_PART_ERROR:
            return {
                ...state,
                updateSuccess: false,
                updateError: action.updateError
            };
        default: 
            return state;
    }
}