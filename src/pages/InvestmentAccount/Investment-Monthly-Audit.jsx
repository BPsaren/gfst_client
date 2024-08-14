import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import ConsumerPDFViewerInvestment from "./ConsumerPDFViewerInvestment";
import NoDataModal from "./NoDataModal"; // Ensure you have this component
import "./investmentMonthlyAudit.css";

export const InvestmentMonthlyAudit = () => {
  const [users, setUsers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalInvestmentAmount, setTotalInvestmentAmount] = useState(0);
  const [recoveryInvestmentTotalAmount, setRecoveryInvestmentTotalAmount] = useState(0);
  const [remainingTotalAmount, setRemainingTotalAmount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showNoDataModal, setShowNoDataModal] = useState(false);
  const { authorizationToken } = useAuth();

  // Function to fetch investment data
  const fetchAllInvestmentData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/getallinvestments", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (Array.isArray(data.users)) {
        setUsers(data.users);
        setTotalAmount(data.totalAmount || 0);
        setTotalInvestmentAmount(data.totalInvestmentAmount || 0);
        setRecoveryInvestmentTotalAmount(data.recoveryInvestmentTotalAmount || 0);
        setRemainingTotalAmount(data.remainingTotalAmount || 0);
      } else {
        console.error("Data is not an array:", data);
        setUsers([]);
      }
    } catch (error) {
      console.error(error);
      setUsers([]);
    }
  };

  // Function to filter users by selected month
  const filterByMonth = (users, month) => {
    return users.filter((user) => {
      const userMonth = new Date(user.date).getMonth() + 1;
      return userMonth === parseInt(month);
    });
  };

  // Effect to fetch data on component mount
  useEffect(() => {
    fetchAllInvestmentData();
  }, [authorizationToken]);

  // Handle month selection change
  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);

    // Check if there are users for the selected month
    const filteredUsers = filterByMonth(users, month);
    if (filteredUsers.length === 0) {
      setShowNoDataModal(true);
    } else {
      setShowNoDataModal(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtered users based on search query
  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    const accountNo = user.account_no ? user.account_no.toLowerCase() : "";
    const consumerName = user.consumer_name ? user.consumer_name.toLowerCase() : "";
    const transactionNo = user.transaction_no ? user.transaction_no.toLowerCase() : "";
    return (
      accountNo.includes(searchLower) ||
      consumerName.includes(searchLower) ||
      transactionNo.includes(searchLower)
    );
  });

  // Users to display based on selected month
  const usersToDisplay = selectedMonth ? filterByMonth(filteredUsers, selectedMonth) : filteredUsers;

  return (
    <section className="investment-monthly-audit-section">
      <div className="container-insvest-data">
        <p>All Consumers Total Amount: {totalAmount}</p>
        <p>Total Investment Amount: {totalInvestmentAmount}</p>
        <p>Total Investment Recovery: {recoveryInvestmentTotalAmount}</p>
        <p>Remaining Total Investment: {remainingTotalAmount}</p>
      </div>

      {/* Month Selector */}
      <div className="month-selector-container">
        <label htmlFor="month-selector">Select Month For Print:</label>
        <select id="month-selector" value={selectedMonth} onChange={handleMonthChange} className="month-selector">
          <option value="">All</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      {/* Search Input */}
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search by Account Number or Consumer Name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/* PDF Viewer Component */}
      {usersToDisplay.length > 0 && (
        <div className="pdf-viewer-container">
          <ConsumerPDFViewerInvestment 
            data={usersToDisplay} 
            totalAmount={totalAmount} 
            totalInvestment={totalInvestmentAmount} 
            totalRecovery={recoveryInvestmentTotalAmount} 
            remainingInvestment={remainingTotalAmount} 
          />
        </div>
      )}

      {/* Data Table */}
      <div className="table-container-ins-month">
        <table className="investment-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction No</th>
              <th>Account Number</th>
              <th>Consumer Name</th>
              <th>Total Investment Amount</th>
              <th>EMI</th>
              <th>Amount Of Investment Recovery</th>
              <th>Remaining Investment</th>
            </tr>
          </thead>
          <tbody>
            {usersToDisplay.map((curUser) => (
              <tr key={curUser._id}>
                <td>{new Date(curUser.date).toLocaleDateString()}</td>
                <td>{curUser.transaction_no}</td>
                <td>{curUser.account_no}</td>
                <td>{curUser.consumer_name}</td>
                <td>{curUser.investment_of_customers_business}</td>
                <td>{curUser.profit_on_customer_investment}</td>
                <td>{curUser.amount_of_investment_recovery}</td>
                <td>{curUser.individual_total__investment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Data Modal */}
      {showNoDataModal && (
        <NoDataModal onClose={() => setShowNoDataModal(false)} />
      )}
    </section>
  );
};
