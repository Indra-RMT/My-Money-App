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

export const getTransactionById = (transactionId) => {
  return {
    type: actionTypes.TRANS_GET_BY_ID,
    transactionId: transactionId
  }
}

export const getTransactionByIdSuccess = (transaction) => {
  return {
    type: actionTypes.TRANS_GET_BY_ID_SUCCESS,
    transaction: transaction
  }
}

export const editTransaction = (transaction) => {
  return {
    type: actionTypes.TRANS_EDIT,
    transaction: transaction
  }
}

export const editTransactionToNull = () => {
  return {
    type: actionTypes.TRANS_EDIT_TO_NULL
  }
}