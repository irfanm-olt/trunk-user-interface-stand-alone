import * as Actions from './constants';
import { 
    createCustomer, 
    loadCustomer,
    deleteCustomer
 } from './service';
const { put, call, takeEvery } = require("@redux-saga/core/effects");
/**
 * Create Customer saga
 */
function* createCustomerSaga({ formData }) {
    try {
        const {data} = yield call(createCustomer, formData);
        yield put({
            type: Actions.CREATE_CUSTOMER_SUCCESS,
            payload: data,
        });

    } catch (error) {
        yield put({
            type: Actions.CREATE_CUSTOMER_ERROR,
            error: error,
        });
    }
}


/**
 * Load customer
 */
function* loadCustomerSaga({ query }) {
    try {
        const { data, pager } = yield call(loadCustomer, { query });
        yield put({
            type: Actions.LOAD_CUSTOMER_SUCCESS,
            payload: data,
            pager: pager
        });
    } catch (error) {
        yield put({
            type: Actions.LOAD_CUSTOMER_ERROR,
            error: error,
        });
    }
}

/**
 *  DELETE CUSTOMER
 */

 function* deleteCustomerSaga({id}) {
    try {
        const { data } = yield call(deleteCustomer, {id});
        yield put({
            type: Actions.DELETE_CUSTOMER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        yield put({
            type: Actions.DELETE_CUSTOMER_ERROR,
            error: "Can't delete this record!",
        });
    }
}

export default function* customerSaga() {
    yield takeEvery(Actions.CREATE_CUSTOMER, createCustomerSaga);
    yield takeEvery(Actions.LOAD_CUSTOMER, loadCustomerSaga);
    yield takeEvery(Actions.DELETE_CUSTOMER, deleteCustomerSaga);
}
