import * as actionTypes from './actionTypes';

export const fetchTransactionStart = () => {
  return {
    type: actionTypes.TRANS_FETCH_START
  }
}

export const fetchTransactionFail = () => {
  return {
    type: actionTypes.TRANS_FETCH_FAIL
  }
}

export const readAllTransaction = (userId) => {
  return {
    type: actionTypes.TRANS_READ_ALLTRANSACTION,
    userId: userId
  }
}

export const readAllTransactionSuccess = (allTransaction) => {
  return {
    type: actionTypes.TRANS_READ_ALLTRANSACTION_SUCCESS,
    allTransaction: allTransaction
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

export const transactionSuccess = (target) => {
  return {
    type: actionTypes.TRANS_SUCCESS,
    success: target
  }
}

export const transactionDefault = () => {
  return {
    type: actionTypes.TRANS_DEFAULT
  }
}

export const transactionFail = (target) => {
  return {
    type: actionTypes.TRANS_FAIL,
    error: target
  }
}

export const getTransactionById = (transactionId) => {
  return {
    type: actionTypes.TRANS_GET_BY_ID,
    transactionId: transactionId
  }
}

export const deleteTransactionById = (transactionId) => {
  return {
    type: actionTypes.TRANS_DELETE_BY_ID,
    transactionId: transactionId
  }
}

export const getTransactionByIdSuccess = (transactionDetail) => {
  return {
    type: actionTypes.TRANS_GET_BY_ID_SUCCESS,
    transactionDetail: transactionDetail
  }
}

export const editTransaction = (transactionDetail) => {
  return {
    type: actionTypes.TRANS_EDIT,
    transactionDetail: transactionDetail
  }
}

export const editTransactionToNull = () => {
  return {
    type: actionTypes.TRANS_EDIT_TO_NULL
  }
}