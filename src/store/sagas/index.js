import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga
} from './auth';

import {
  addTransactionSaga,
  readAllTransactionSaga,
  getTransactionByIdSaga
} from './transactions';

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USERS, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    takeEvery(actionTypes.TRANS_READ_ALLTRANSACTION, readAllTransactionSaga),
    takeEvery(actionTypes.TRANS_ADD, addTransactionSaga),
    takeEvery(actionTypes.TRANS_GET_BY_ID, getTransactionByIdSaga)
  ])
}