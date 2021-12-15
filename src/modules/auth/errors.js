import * as Actions from './constants';
const initialState = {};
export default function errors (state = initialState, action) {
    switch(action.type)
    {
        case Actions.GET_LOGIN_ERRORS:
            return {
                errors: action.payload
            }
    default:
        return state;
    }
}