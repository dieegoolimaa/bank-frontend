import TransactionList from "../components/Transactions.jsx";

const HomePage = () => {
  return (
    <div className="container">
      <h1>Welcome to the Home Page</h1>
      {/* Nome */}
      {/* Account */}
      <TransactionList accountId="account-id" />
    </div>
  );
};

export default HomePage;
