import * as Actions from './constants';
const initialState = {
    errors: {},
};
export default function customerErrors(state = initialState, action) {
    switch(action.type)
    {
        case Actions.CREATE_CUSTOMER_ERROR:
            return {
                ...state,
                errors: action.error
            }
    default:
        return state;
    }
}