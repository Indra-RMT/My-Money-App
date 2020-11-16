import * as actionTypes from './actionTypes';

export const addTransaction = ({
  transactionType,
  name,
  date,
  money,
  description
}) => {
  return {
    type: actionTypes.TRANS_ADD,
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