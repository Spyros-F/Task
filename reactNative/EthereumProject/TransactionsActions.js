export const addTransactions = transactionsIndex => (
    {
      type: 'SELECT_TRANSACTION',
      payload: transactionsIndex,
    }
  );