import * as Actions from './constants';
import { 
    addCar, 
    loadCar, 
    fetchManufactures,
    deleteCar,
    updateCar
} from './service';
const { put, call, takeEvery, all } = require("@redux-saga/core/effects");

/**
 * ADD CAR
 */
function* addCarSaga({ manufacture, carName }) {
    try {
        const { data } = yield call(addCar, {
            manufacture,
            carName
        });
        yield put({
            type: Actions.ADD_CAR_SUCCESS,
            payload: data,
        });

    } catch (error) {
        yield put({
            type: Actions.ADD_CAR_ERROR,
            error: error,
        });
    }
}

/**
 * LOAD CAR
 */
function* loadCarSaga({query}) {
    try {
        const { car, manufacture } = yield all({
            car: call(loadCar, {query}),
            manufacture: call(fetchManufactures)
        });
        yield put({
            type: Actions.LOAD_CAR_SUCCESS,
            carName: car.data,
            manufacture: manufacture.data,
            pager: car.pager
        });
    } catch (error) {
        yield put({
            type: Actions.LOAD_CAR_ERROR,
            error: error,
        });
    }
}


/**
 *  DELETE CAR
 */

 function* deleteCarSaga({id}) {
    try {
        const { data } = yield call(deleteCar, {id});
        yield put({
            type: Actions.DELETE_CAR_SUCCESS,
            payload: data,
        });
    } catch (error) {
        yield put({
            type: Actions.DELETE_CAR_ERROR,
            error: "Can't delete this record!",
        });
    }
}

/**
 * UPDATE CAR
 */

function* updateCarSaga({datas}) {
    try {
        const { data } = yield call(updateCar, {datas});
        yield put({
            type: Actions.UPDATE_CAR_SUCCESS,
            payload: data
        })
    } catch (error) {
        yield put({
            type: Actions.UPDATE_CAR_ERROR,
            updateError: "can't update record!"
        })
    }
}

export default function* carSaga() {
    yield takeEvery(Actions.ADD_CAR, addCarSaga);
    yield takeEvery(Actions.LOAD_CAR,loadCarSaga);
    yield takeEvery(Actions.DELETE_CAR, deleteCarSaga);
    yield takeEvery(Actions.UPDATE_CAR, updateCarSaga);
}
