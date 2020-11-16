import { delay } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

export function* addTransactionSaga(action) {
  const transactionData = { 
    userId: yield localStorage.getItem('userId'),
    transactionType: action.transactionType,
    name: action.name,
    date: action.date.getTime(),
    money: action.money,
    description: action.description
  }

  console.log(transactionData)

  let url = 'https://mymoney-a7d06.firebaseio.com';

  try {
    const response = yield axios.post(url + '/transaction.json', transactionData);
    console.log(response);
    yield put(actions.addTransactionSuccess());
  } catch (error) {
    console.log(error);
    yield put(actions.addTransactionFail());
  }
}