import * as Actions from './constants';
const initialState = {
    loading: false,
    cars: [],
    pager: {}
}

export default function carReducer(state = initialState, action) {
    switch (action.type) {
        /**
         * add car
         */
        case Actions.ADD_CAR:
            return {
                ...state,
                loading: true,
            };
        case Actions.ADD_CAR_SUCCESS:
            return {
                ...state,
                //cars: state.cars.concat(action.payload),
                pager: state.cars.concat(action.pager),
                loading: false,
            };
        case Actions.ADD_CAR_ERROR:
            return {
                ...state,
                data: action.payload,
                loading: false,
            };
        /**
         * load master
         */
        case Actions.LOAD_CAR:
            return {
                ...state,
                loading: true,
            };
        case Actions.LOAD_CAR_SUCCESS:
            return {
                ...state,
                cars: action.carName,
                manufactures: action.manufacture,
                loading: false,
                pager: action.pager
            };
        case Actions.LOAD_CAR_ERROR:
            return {
                ...state,
                data: action.payload,
                loading: false,
            };
        /**
         * DELETE CAR
         */
         case Actions.DELETE_CAR_SUCCESS:
            return {
                ...state,
                //cars: state.cars.filter(item => item.ID !== action.payload),
                pager: state.cars.filter(item => item.ID !== action.payload),
                successData: false
            }
        case Actions.DELETE_CAR_ERROR:
            return {
                ...state,
                successData: false,
                deleteErrorData: action.error,
                errorData: '',
            }
        /**
         * update manufacture
         */
        case Actions.UPDATE_CAR:
            return {
                ...state,
                loading: true,
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
                loading: false,
            };
        case Actions.UPDATE_CAR_ERROR:
            return {
                ...state,
                errorData: action.error,
                loading: false,
            };
        default: 
            return state;
    }
}