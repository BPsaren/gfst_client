import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import ConsumerPDFViewerLoan from "./ConsumerPDFViewerLoan";
import NoDataModalLoan from "./NoDataModalLoan";
import "./monthlyAuditData.css";

export const LoanMonthlyAudit = () => {
  const [users, setUsers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalLoanAmount, setTotalLoanAmount] = useState(0);
  const [recoveryLoanAmount, setRecoveryLoanAmount] = useState(0);
  const [remainingLoanAmount, setRemainingLoanAmount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showNoDataModal, setShowNoDataModal] = useState(false);
  const { authorizationToken } = useAuth();

  const fetchAllLoanHolders = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/getallloanholders", {
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
        setTotalAmount(data.totalAmount);
        setTotalLoanAmount(data.totalLoanAmount);
        setRecoveryLoanAmount(data.recoveryLoanAmount);
        setRemainingLoanAmount(data.remainingLoanAmount);
      } else {
        console.error("Data is not an array:", data);
        setUsers([]);
      }
    } catch (error) {
      console.error(error);
      setUsers([]);
    }
  };

  const filterByMonth = (users, month) => {
    return users.filter((user) => {
      const userMonth = new Date(user.date).getMonth() + 1;
      return userMonth === parseInt(month);
    });
  };

  useEffect(() => {
    fetchAllLoanHolders();
  }, []);

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);

    // Check if there are users for the selected month
    const filteredUsers = filterByMonth(users, month);
    if (filteredUsers.length === 0) {
      setShowNoDataModal(true);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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

  const usersToDisplay = selectedMonth ? filterByMonth(filteredUsers, selectedMonth) : filteredUsers;

  const handleCloseModal = () => {
    setShowNoDataModal(false);
  };

  return (
    <section className="admin-users-section">
      <div className="container-loan-data">
        <p>All Consumers Total Amount is: {totalAmount}</p>
        <p>Total Loan Amount is: {totalLoanAmount}</p>
        <p>Total Recovery Loan: {recoveryLoanAmount}</p>
        <p>Remaining Total Loan: {remainingLoanAmount}</p>
      </div>
      <div className="month-print">
        <label htmlFor="month">Select Month For Print:</label>
        <select id="month" value={selectedMonth} onChange={handleMonthChange}>
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
      <div className="search-month-input">
        <input
          type="text"
          placeholder="Search by Account Number or Consumer Name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {usersToDisplay.length > 0 && (
        <div className="pdf-viewer-container">
          <ConsumerPDFViewerLoan 
            data={usersToDisplay} 
            totalAmount={totalAmount} 
            totalLoan={totalLoanAmount} 
            totalRecovery={recoveryLoanAmount} 
            remainingLoan={remainingLoanAmount} 
          />
        </div>
      )}

      <div className="table-container">
        <table className="loan-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction No</th>
              <th>Account Number</th>
              <th>Consumer Name</th>
              <th>Total Loan Amount</th>
              <th>EMI</th>
              <th>Amount Of Loan Recovery</th>
              <th>Remaining Loan</th>
            </tr>
          </thead>
          <tbody>
            {usersToDisplay.map((curUser) => (
              <tr key={curUser._id}>
                <td>{new Date(curUser.date).toLocaleDateString()}</td>
                <td>{curUser.transaction_no}</td>
                <td>{curUser.account_no}</td>
                <td>{curUser.consumer_name}</td>
                <td>{curUser.starting_loan}</td>
                <td>{curUser.loan_deposit}</td>
                <td>{curUser.amount_of_loan_recovery}</td>
                <td>{curUser.total_loan_credit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showNoDataModal && (
        <NoDataModalLoan onClose={handleCloseModal} />
      )}
    </section>
  );
};
