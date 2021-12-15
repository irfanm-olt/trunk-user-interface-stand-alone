import * as Actions from './constants';
import { 
    addPartSection, 
    loadPartSection,
    deletePartSection,
    updatePartSection
} from './service';
const { put, call, takeEvery } = require("@redux-saga/core/effects");

/**
 * Add vehicle master saga
 */
function* addPartSectionSaga({ sectionName }) {
    try {
        const { data } = yield call(addPartSection, {
            sectionName
        });
        yield put({
            type: Actions.ADD_PART_SECTION_SUCCESS,
            payload: data,
        });

    } catch (error) {
        yield put({
            type: Actions.ADD_PART_SECTION_ERROR,
            error: error,
        });
    }
}


/**
 * Load vehicle master
 */
function* loadPartSectionSaga({ query }) {
    try {
        const { data, pager } = yield call(loadPartSection, { query });
        yield put({
            type: Actions.LOAD_PART_SECTION_SUCCESS,
            payload: data,
            pager: pager
        });
    } catch (error) {
        yield put({
            type: Actions.LOAD_PART_SECTION_ERROR,
            error: error,
        });
    }
}

/**
 *  DELETE PART SECTION
 */

 function* deletePartSectionSaga({id}) {
    try {
        const { data } = yield call(deletePartSection, {id});
        yield put({
            type: Actions.DELETE_PART_SECTION_SUCCESS,
            payload: data,
        });
    } catch (error) {
        yield put({
            type: Actions.DELETE_PART_SECTION_ERROR,
            error: "Can't delete this record!",
        });
    }
}

/**
 * UPDATE PART SECTION
 */

function* updatePartSectionSaga({datas}) {
    try {
        const { data } = yield call(updatePartSection, {datas});
        yield put({
            type: Actions.UPDATE_PART_SECTION_SUCCESS,
            payload: data
        })
    } catch (error) {
        yield put({
            type: Actions.UPDATE_PART_SECTION_ERROR,
            updateError: "can't update record!"
        })
    }
}

export default function* partSectionSaga() {
    yield takeEvery(Actions.ADD_PART_SECTION, addPartSectionSaga);
    yield takeEvery(Actions.LOAD_PART_SECTION,loadPartSectionSaga );
    yield takeEvery(Actions.DELETE_PART_SECTION, deletePartSectionSaga);
    yield takeEvery(Actions.UPDATE_PART_SECTION, updatePartSectionSaga);
}
