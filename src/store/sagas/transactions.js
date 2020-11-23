import { delay } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';
import axios from '../../../axios-transactions';

import * as actions from '../actions/index';

export function* initTransactionsSaga(action) {
  try {
    const userToken = localStorage.getItem('token');
    const queryParams = '?auth=' + userToken + '&orderBy="userId"&equalTo="' + action.userId + '"';
    const response = yield axios.get(queryParams);
    const fetchedTransactions = [];
    for ( let key in response.data ) {
      fetchedTransactions.push( {
            ...response.data[key],
            id: key
        } );
    }
    yield put(actions.fetchTransactionsSuccess(fetchedTransactions));
  } catch (error) {
  }
}

export function* addTransactionSaga(action) {
  const transactionData = { 
    userId: action.userId,
    transactionType: action.transactionType,
    name: action.name,
    date: action.date.getTime(),
    money: action.money,
    description: action.description
  }

  const userToken = localStorage.getItem('token');
  const queryParams = `?auth=${userToken}`;

  try {
    const response = yield axios.post(queryParams, transactionData);
    yield put(actions.addTransactionSuccess());
    yield put(actions.initTransactions(action.userId));
  } catch (error) {
    yield put(actions.addTransactionFail());
  }
}

export function* getTransactionByIdSaga(action) {
  try {
    const userToken = localStorage.getItem('token');
    const queryParams = `?auth=${userToken}&orderBy="$key"&equalTo="${action.transactionId}"`;
    const response = yield axios.get(queryParams);
    let fetchedTransaction = null;
    for ( let key in response.data ) {
      fetchedTransaction = {
        ...response.data[key],
        id: key
      };
    }
    yield put(actions.getTransactionByIdSuccess(fetchedTransaction));
  } catch (error) {
  }
}