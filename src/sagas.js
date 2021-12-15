import {all} from 'redux-saga/effects';

import authSaga from './modules/auth/saga';
import customerSaga from './modules/customer/saga';
import enquirySaga from './modules/enquiry/saga';
import manufactureSaga from './modules/masters/manufacture/saga';
import carSaga from './modules/masters/car/saga';
import partSectionSaga from './modules/masters/partSection/saga';
import partSaga from './modules/masters/part/saga';

/**
 * Root saga
 * @returns {IterableIterator<AllEffect | GenericAllEffect<any> | *>}
 */

export default function* rootSagas() {
    yield all([
        authSaga(),
        customerSaga(),
        enquirySaga(),
        manufactureSaga(),
        carSaga(),
        partSectionSaga(),
        partSaga(),
    ]);
}