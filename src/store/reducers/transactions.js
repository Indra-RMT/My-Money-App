import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  allTransaction: null,
  success: false,
  error: false,
  transactionDetail: null,
  loading: false,
};

const fetchTransactionStart = (state, action) => {
  return updateObject(state, {
    error: false,
    loading: true
  });
}

const fetchTransactionFail = (state, action) => {
  return updateObject(state, {
    error: 'read',
    loading: false
  })
}

const setAllTransaction = (state, action) => {
  return updateObject(state, {
    allTransaction: action.allTransaction,
    loading: false
  })
}

const setTransactionSuccess = (state, action) => {
  return updateObject(state, {
    success: action.success,
    error: false,
    loading: false
  });
}

const setTransactionFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
}

const setTransactionDefault = (state, action) => {
  return updateObject(state, {
    success: false,
    error: false,
    loading: false
  });
} 

const setTransactionDetail = (state, action) => {
  return updateObject(state, {
    transactionDetail: action.transactionDetail,
    loading: false });
}

const setNullTransactionDetail = (state, action) => {
  return updateObject(state, { transactionDetail: null });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TRANS_FETCH_START: return fetchTransactionStart(state);
    case actionTypes.TRANS_FETCH_FAIL: return fetchTransactionFail(state);
    case actionTypes.TRANS_READ_ALLTRANSACTION_SUCCESS: return setAllTransaction(state, action);
    case actionTypes.TRANS_SUCCESS: return setTransactionSuccess(state, action);
    case actionTypes.TRANS_DEFAULT: return setTransactionDefault(state, action);
    case actionTypes.TRANS_FAIL: return setTransactionFail(state, action);
    case actionTypes.TRANS_GET_BY_ID_SUCCESS: return setTransactionDetail(state, action);
    case actionTypes.TRANS_EDIT_TO_NULL: return setNullTransactionDetail(state);
    default: return state
  }
}

export default reducer;