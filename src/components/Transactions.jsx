import AxiosApi from "./AxiosApi";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TransactionList = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await AxiosApi.get(`/accounts/${userId}/transactions`);
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error(
          "Error fetching transactions:",
          error.response?.data || error.message
        );
      }
    };
    fetchTransactions();
  }, [userId]);

  return (
    <div>
      <h2>Transactions</h2>
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id}>
              {transaction.type}: {transaction.amount} {transaction.currency} -{" "}
              {new Date(transaction.date).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

TransactionList.propTypes = {
  accountId: PropTypes.string.isRequired,
};

export default TransactionList;
