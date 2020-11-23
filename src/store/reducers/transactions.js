import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  isAddTransactionSuccess: null,
  transactions: null,
  transaction: null
};

const fetchTransactionsStart = () => {
  return
}

const fetchTransactionSuccess = (state, action) => {
  return updateObject(state, { transactions: action.transactions })
}

const fetchTransactionFail = () => {
  return
}

const setTransactionSuccess = (state, action) => {
  return updateObject(state, { isAddTransactionSuccess: true });
}

const setTransactionDefault = (state, action) => {
  return updateObject(state, { isAddTransactionSuccess: null });
} 

const setTransactionFail = (state, action) => {
  return updateObject(state, { isAddTransactionSuccess: false });
}

const setGetTransByIdSuccess = (state, action) => {
  return updateObject(state, { transaction: action.transaction });
}

const setTransactionToNull = (state, action) => {
  return updateObject(state, { transaction: null });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TRANS_SUCCESS: return setTransactionSuccess(state, action);
    case actionTypes.TRANS_DEFAULT: return setTransactionDefault(state, action);
    case actionTypes.TRANS_FAIL: return setTransactionFail(state, action);
    case actionTypes.TRANS_FETCH_INIT_SUCCESS: return fetchTransactionSuccess(state, action);
    case actionTypes.TRANS_GET_BY_ID_SUCCESS: return setGetTransByIdSuccess(state, action);
    case actionTypes.TRANS_EDIT_TO_NULL: return setTransactionToNull(state);
    default: return state
  }
}

export default reducer;