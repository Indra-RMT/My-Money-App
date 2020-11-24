import { delay } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';
import axios from '../../../axios-transactions';
import pureAxios from 'axios';

import * as actions from '../actions/index';

export function* readAllTransactionSaga(action) {
  yield put(actions.fetchTransactionStart());
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
    yield put(actions.readAllTransactionSuccess(fetchedTransactions));
  } catch (error) {
    yield put(actions.fetchTransactionFail(error));
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
    yield put(actions.fetchTransactionStart());
    yield axios.post(queryParams, transactionData);
    yield put(actions.transactionSuccess('add'));
    yield put(actions.readAllTransaction(action.userId));
  } catch (error) {
    yield put(actions.transactionFail('add'));
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

export function* deleteTransactionByIdSaga(action) {
  yield put(actions.fetchTransactionStart());
  try {
    const userToken = localStorage.getItem('token');
    const queryParams = `?auth=${userToken}`;
    yield pureAxios.delete(`https://mymoney-a7d06.firebaseio.com/transactions/${action.transactionId}.json` + queryParams);
    yield put(actions.transactionSuccess('delete'));
  } catch (error) {
    yield put(actions.transactionFail('delete'));
  }
}