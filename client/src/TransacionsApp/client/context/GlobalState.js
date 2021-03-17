import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
import { IncomeExpenses } from '../components/IncomeExpenses';

// Initial state
const initialState = {
  users: [],
  transactions: [],
  error: null,
  loading: true
}

// Create Global context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getTransactions() {
    try {
      const res = await axios.get('/api/transaction');
      
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data
      });

    } catch (err) {

      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }


  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/transaction/${id}`);

      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });

    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }    
  }

  // Get profile by ID
const getTransactionsByUserID = userID => async dispatch => {

  try {
    const res = await axios.get(`/api/transaction/${userID}`);

    dispatch({
      type: 'GET_TRANSACTIONS_BY_ID',
      payload: res.data
    });
  
  } catch (err) {
    dispatch({
      type: 'TRANSACTION_ERROR',
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

  async function addTransaction(transaction) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/transaction', transaction, config)

      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data
      });

    } catch (err) {
      
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }    
  }

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    error: state.error,
    loading: state.loading,
    users: state.users,
    getTransactions,
    deleteTransaction,
    addTransaction,
  }}>
    {children}
  </GlobalContext.Provider>);
}