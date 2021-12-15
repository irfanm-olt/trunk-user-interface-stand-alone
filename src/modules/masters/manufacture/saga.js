import * as Actions from './constants';
import { addManufacture, loadManufacture, deleteManufacture, updateManufacture } from './service';
const { put, call, takeEvery } = require("@redux-saga/core/effects");

/**
 * ADD MANUFACTURE
 */
function* addManufactureSaga({ manufacture }) {
    try {
        const { data } = yield call(addManufacture, {
            manufacture
        });
        yield put({
            type: Actions.ADD_MANUFACTURE_SUCCESS,
            payload: data,
        });

    } catch (error) {
        yield put({
            type: Actions.ADD_MANUFACTURE_ERROR,
            payload: error.error,
        });
    }
}

/**
 * LOAD MANUFACTURE
 */
function* loadManufactureSaga({ query }) {
    try {
        const { data, pager } = yield call(loadManufacture, {query});
        yield put({
            type: Actions.LOAD_MANUFACTURE_SUCCESS,
            payload: data,
            pager: pager
        });
    } catch (error) {
        yield put({
            type: Actions.LOAD_MANUFACTURE_ERROR,
            error: error,
        });
    }
}

/**
 *  DELETE MANUFACTURE
 */

function* deleteManufactureSaga({id}) {
    try {
        const { data } = yield call(deleteManufacture, {id});
        yield put({
            type: Actions.DELETE_MANUFACTURE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        yield put({
            type: Actions.DELETE_MANUFACTURE_ERROR,
            error: "Can't delete this record!",
        });
    }
}

/**
 * UPDATE MANUFACTURE
 */

function* updateManufactureSaga({datas}) {
    try {
        const { data } = yield call(updateManufacture, {datas});
        yield put({
            type: Actions.UPDATE_MANUFACTURE_SUCCESS,
            payload: data
        })
    } catch (error) {
        yield put({
            type: Actions.UPDATE_MANUFACTURE,
            updateError: "can't update record!"
        })
    }
}

export default function* manufactureSaga() {
    yield takeEvery(Actions.ADD_MANUFACTURE, addManufactureSaga);
    yield takeEvery(Actions.LOAD_MANUFACTURE,loadManufactureSaga );
    yield takeEvery(Actions.DELETE_MANUFACTURE, deleteManufactureSaga);
    yield takeEvery(Actions.UPDATE_MANUFACTURE, updateManufactureSaga);
}
