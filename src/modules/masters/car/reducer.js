import * as Actions from './constants';
const initialState = {
    cars: [],
    pager: {},
    createError: null,
    createSuccess: false,
    deleteError: null,
    deleteSuccess: false,
    updateError: null,
    updateSuccess: false,
}

export default function carReducer(state = initialState, action) {
    switch (action.type) {
        /**
         * add car
         */
        case Actions.ADD_CAR:
            return {
                ...state,
                createSuccess: false,
                createError: null
            };
        case Actions.ADD_CAR_SUCCESS:
            return {
                ...state,
                pager: state.cars.concat(action.pager),
                createSuccess: true,
                createError: null
            };
        case Actions.ADD_CAR_ERROR:
            return {
                ...state,
                data: action.payload,
                createSuccess: false,
                createError: action.error
            };
        /**
         * load master
         */
        case Actions.LOAD_CAR:
            return {
                ...state,
            };
        case Actions.LOAD_CAR_SUCCESS:
            return {
                ...state,
                cars: action.carName,
                manufactures: action.manufacture,
                pager: action.pager
            };
        case Actions.LOAD_CAR_ERROR:
            return {
                ...state,
                data: action.payload,
            };
        /**
         * DELETE CAR
         */
         case Actions.DELETE_CAR:
            return {
                ...state,
                deleteSuccess: false,
                deleteError: null
            };
         case Actions.DELETE_CAR_SUCCESS:
            return {
                ...state,
                pager: state.cars.filter(item => item.ID !== action.payload),
                deleteSuccess: true,
                deleteError: null
            }
        case Actions.DELETE_CAR_ERROR:
            return {
                ...state,
                deleteSuccess: false,
                deleteError: action.error
            }
        /**
         * update manufacture
         */
        case Actions.UPDATE_CAR:
            return {
                ...state,
                updateSuccess: false,
                updateError: null
            };
        case Actions.UPDATE_CAR_SUCCESS:
            return {
                ...state,
                pager: state.cars.map(    
                    (items, index) => 
                        items.ID === action.payload[0].ID ? 
                            {...items, Name : action.payload[0].Name }    
                                : items
                    ),
                updateSuccess: true,
                updateError: null
            };
        case Actions.UPDATE_CAR_ERROR:
            return {
                ...state,
                updateSuccess: false,
                updateError: action.updateError
            };
        default: 
            return state;
    }
}