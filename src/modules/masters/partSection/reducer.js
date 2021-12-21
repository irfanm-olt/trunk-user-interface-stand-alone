import * as Actions from './constants';
const initialState = {
    partSections: [],
    pager: {},
    createError: null,
    createSuccess: false,
    deleteError: null,
    deleteSuccess: false,
    updateError: null,
    updateSuccess: false,
}

export default function partSectionReducer(state = initialState, action) {
    switch (action.type) {
        /**
         * add car
         */
        case Actions.ADD_PART_SECTION:
            return {
                ...state,
                createSuccess: false,
                createError: null
            };
        case Actions.ADD_PART_SECTION_SUCCESS:
            return {
                ...state,
                pager: state.partSections.concat(action.pager),
                createSuccess: true,
                createError: null
            };
        case Actions.ADD_PART_SECTION_ERROR:
            return {
                ...state,
                data: action.payload,
                createSuccess: false,
                createError: action.error
            };
        /**
         * load master
         */
        case Actions.LOAD_PART_SECTION:
            return {
                ...state,
            };
        case Actions.LOAD_PART_SECTION_SUCCESS:
            return {
                ...state,
                partSections: action.payload,
                pager: action.pager
            };
        case Actions.LOAD_PART_SECTION_ERROR:
            return {
                ...state,
                data: action.payload,
            };
        /**
         * delete part section
         */
         case Actions.DELETE_PART_SECTION:
            return {
                ...state,
                deleteSuccess: false,
                deleteError: null
            };
         case Actions.DELETE_PART_SECTION_SUCCESS:
            return {
                ...state,
                partSections: state.partSections.filter(item => item.ID !== action.payload),
                deleteSuccess: true,
                deleteError: null
            }
        case Actions.DELETE_PART_SECTION_ERROR:
            return {
                ...state,
                deleteSuccess: false,
                deleteError: action.error
            }
        /**
         * update part section
         */
         case Actions.UPDATE_PART_SECTION:
            return {
                ...state,
                updateSuccess: false,
                updateError: null
            };
        case Actions.UPDATE_PART_SECTION_SUCCESS:
            return {
                ...state,
                partSections: state.partSections.map(    
                    (items, index) => 
                        items.ID === action.payload[0].ID ? 
                            {...items, Name : action.payload[0].Name }    
                                : items
                    ),
                updateSuccess: true,
                updateError: null
            };
        case Actions.UPDATE_PART_SECTION_ERROR:
            return {
                ...state,
                updateSuccess: false,
                updateError: action.updateError
            };
        default: 
            return state;
    }
}