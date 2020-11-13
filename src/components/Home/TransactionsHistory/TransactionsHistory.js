import React, { useState } from 'react';

import Transaction from './Transaction/Transaction';

const TransactionsHistory = (props) => {
  const [transactions, setTransactions] = useState([
    {
      id: '001',
      type: 'spend',
      name: 'Beli Meja',
      date: '11-02-2020',
      money: '1700000',
    },
    {
      id: '002',
      type: 'income',
      name: 'Projek Dua',
      date: '11-02-2020',
      money: '2400000'
    },
    {
      id: '003',
      type: 'income',
      name: 'Projek Satu',
      date: '11-02-2020',
      money: '6200000'
    }
  ]);
  
  return (
    <div>
      {transactions.map(trans => (
        <Transaction
          key={trans.id}
          type={trans.type}
          name={trans.name}
          date={trans.date}
          money={trans.money} />
      ))}    
    </div>
  );
}

export default TransactionsHistory;