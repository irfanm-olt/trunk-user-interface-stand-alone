import * as Actions from './constants';
import {put, call, takeEvery} from 'redux-saga/effects';
import globalConfig from '../../utils/global';
import {
  emailLogin,
} from './srevice';
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";

/**
 * Do login success
 * @param token
 * @param user
 * @returns {IterableIterator<*>}
 */
 function* doLoginSuccess(token, method = 'email') {
    const decoded = jwt_decode(token);
    yield put({
        type: Actions.SET_CURRENT_USER,
        payload: {decoded},
    });
    setAuthToken(token);
    globalConfig.setToken(token);
    localStorage.setItem("jwtToken", token);
}

/**
 * Sign In saga
 * @param username
 * @param password
 * @returns {IterableIterator<*>}
 */
function* signInWithEmailSaga({email, password}) {
    try {
      const {token} = yield call(emailLogin, {
        email,
        password,
      });
     yield call(doLoginSuccess, token, 'email');
    } catch (error) {
      yield put({
        type: Actions.GET_LOGIN_ERRORS,
        payload: error,
    });
    }
}

function* signOutSaga() {
  try {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    yield put({
      type: Actions.SET_CURRENT_USER,
      payload: {},
  });
  } catch (e) {
    // yield call(handleError, e);
  }
}

export default function* authSaga() {
    yield takeEvery(Actions.SIGN_IN_WITH_EMAIL, signInWithEmailSaga);
    yield takeEvery(Actions.SIGN_OUT, signOutSaga);
}