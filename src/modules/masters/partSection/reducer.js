import * as Actions from './constants';
const initialState = {
    loading: false,
    partSections: [],
    errorData:'',
    successData: false,
    pager: {}
}

export default function partSectionReducer(state = initialState, action) {
    switch (action.type) {
        /**
         * add car
         */
        case Actions.ADD_PART_SECTION:
            return {
                ...state,
                loading: true,
            };
        case Actions.ADD_PART_SECTION_SUCCESS:
            return {
                ...state,
                //partSections: state.partSections.concat(action.payload),
                pager: state.partSections.concat(action.pager),
                loading: false,
            };
        case Actions.ADD_PART_SECTION_ERROR:
            return {
                ...state,
                data: action.payload,
                loading: false,
            };
        /**
         * load master
         */
        case Actions.LOAD_PART_SECTION:
            return {
                ...state,
                loading: true,
            };
        case Actions.LOAD_PART_SECTION_SUCCESS:
            return {
                ...state,
                partSections: action.payload,
                loading: false,
                pager: action.pager
            };
        case Actions.LOAD_PART_SECTION_ERROR:
            return {
                ...state,
                data: action.payload,
                loading: false,
            };
        /**
         * delete part section
         */
         case Actions.DELETE_PART_SECTION_SUCCESS:
            return {
                ...state,
                partSections: state.partSections.filter(item => item.ID !== action.payload),
                successData: false
            }
        case Actions.DELETE_PART_SECTION_ERROR:
            return {
                ...state,
                successData: false,
                deleteErrorData: action.error,
                errorData: '',
            }
        /**
         * update part section
         */
         case Actions.UPDATE_PART_SECTION:
            return {
                ...state,
                loading: true,
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
                loading: false,
            };
        case Actions.UPDATE_PART_SECTION_ERROR:
            return {
                ...state,
                errorData: action.error,
                loading: false,
            };
        default: 
            return state;
    }
}