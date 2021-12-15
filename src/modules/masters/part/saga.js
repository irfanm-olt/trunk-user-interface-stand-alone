import * as Actions from './constants';
import { 
    addPart, 
    loadPart, 
    fetchPartSection,
    deletePart,
    updatePart
} from './service';
const { put, call, takeEvery, all } = require("@redux-saga/core/effects");

/**
 * Add car master saga
 */
function* addPartSaga({ partSection, partName }) {
    try {
        const { data } = yield call(addPart, {
            partSection,
            partName
        });
        yield put({
            type: Actions.ADD_PART_SUCCESS,
            payload: data,
        });

    } catch (error) {
        yield put({
            type: Actions.ADD_PART_ERROR,
            error: error,
        });
    }
}

/**
 * Load car master
 */
function* loadPartSaga({ query }) {
    try {
        const { partName, partSection } = yield all({
            partName: call(loadPart, { query }),
            partSection: call(fetchPartSection)
        });
        yield put({
            type: Actions.LOAD_PART_SUCCESS,
            partName: partName.data,
            partSection: partSection.data,
            pager: partName.pager
        });
    } catch (error) {
        yield put({
            type: Actions.LOAD_PART_ERROR,
            error: error,
        });
    }
}

/**
 *  DELETE PART
 */

 function* deletePartSaga({id}) {
    try {
        const { data } = yield call(deletePart, {id});
        yield put({
            type: Actions.DELETE_PART_SUCCESS,
            payload: data,
        });
    } catch (error) {
        yield put({
            type: Actions.DELETE_PART_ERROR,
            error: "Can't delete this record!",
        });
    }
}

/**
 * UPDATE CAR
 */

function* updatePartSaga({datas}) {
    try {
        const { data } = yield call(updatePart, {datas});
        yield put({
            type: Actions.UPDATE_PART_SUCCESS,
            payload: data
        })
    } catch (error) {
        yield put({
            type: Actions.UPDATE_PART_ERROR,
            updateError: "can't update record!"
        })
    }
}

export default function* partSaga() {
    yield takeEvery(Actions.ADD_PART, addPartSaga);
    yield takeEvery(Actions.LOAD_PART,loadPartSaga);
    yield takeEvery(Actions.DELETE_PART, deletePartSaga);
    yield takeEvery(Actions.UPDATE_PART, updatePartSaga);
}
