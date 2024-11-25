import AxiosApi from "./AxiosApi";
import { useState, useEffect } from "react";

const TransactionList = ({ accountId }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await AxiosApi.get(
          `/accounts/${accountId}/transactions`
        );
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, [accountId]);

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            {transaction.type}: {transaction.amount} {transaction.currency} -{" "}
            {new Date(transaction.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
