import * as actionTypes from './actionTypes';

export const initTransactions = (userId) => {
  return {
    type: actionTypes.TRANS_INIT,
    userId: userId
  }
}

export const fetchTransactionsSuccess = (transactions) => {
  return {
    type: actionTypes.TRANS_FETCH_INIT_SUCCESS,
    transactions: transactions
  }
}

export const addTransaction = ({
  userId,
  transactionType,
  name,
  date,
  money,
  description
}) => {
  return {
    type: actionTypes.TRANS_ADD,
    userId: userId,
    transactionType: transactionType,
    name: name,
    date: date,
    money: money,
    description: description
  };
};

export const addTransactionSuccess = () => {
  return {
    type: actionTypes.TRANS_SUCCESS
  }
}

export const addTransactionDefault = () => {
  return {
    type: actionTypes.TRANS_DEFAULT
  }
}

export const addTransactionFail = () => {
  return {
    type: actionTypes.TRANS_FAIL
  }
}

export const getTransactionById = (userId, transactionId) => {
  return {
    type: actionTypes.TRANS_GET_BY_ID,
    userId: userId,
    transactionId: transactionId
  }
}