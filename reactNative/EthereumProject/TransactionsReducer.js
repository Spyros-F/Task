import { combineReducers } from 'redux';
 
const INITIAL_STATE = {
  current: [],
  all_transactions: [
    'Transactions',
  ],
};
 
const transactionsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'SELECT_TRANSACTION':
        
        // copy the state 
        const { current,  all_transactions,} = state;
   
        //remove a subject from the all_transactions array
         
        const addedTransactions = all_transactions.splice(action.payload, 1);
   
        // put subject in current array
        current.push(addedTransactions);
   
        // update the redux state to reflect the change
        const newState = { current, all_transactions };
         
        //return new state
        return newState;
   
      default:
        return state
    }
  };
 
export default combineReducers({
    transactions: transactionsReducer
});