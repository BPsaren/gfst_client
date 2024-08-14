/*import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import ConsumerPDFViewer from "./ConsumerPDFViewer";
import "./monthlyAuditData.css";

export const MonthlyAuditData = () => {
  const [users, setUsers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("");
  const { authorizationToken } = useAuth();

  // Function to fetch consumer data
  const fetchAllConsumerData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/allConsumers", {
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
    return users.filter(user => {
      const userMonth = new Date(user.date).getMonth() + 1;
      return userMonth === parseInt(month);
    });
  };

  // Effect to fetch data on component mount
  useEffect(() => {
    fetchAllConsumerData();
  }, []);

  // Handler for month selection change
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Filtered users based on selected month
  const filteredUsers = selectedMonth ? filterByMonth(users, selectedMonth) : users;

  return (
    <section className="admin-users-section">
      <div className="allConsumerContainer">
        <p>All Consumers Total Amount is: {totalAmount}</p>
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

      {selectedMonth && (
        <div className="pdf-viewer-container">
          <ConsumerPDFViewer data={filteredUsers} totalAmount={totalAmount} />
        </div>
      )}

      <div>
        <table className="consumer-table">
          <thead>
            <tr className="table-header">
              <th>Date</th>
              <th>Transaction No</th>
              <th>Account Number</th>
              <th>Consumer Name</th>
              <th>Total Balance</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((curUser) => (
              <tr key={curUser._id}>
                <td>{curUser.date}</td>
                <td>{curUser.transaction_no}</td>
                <td>{curUser.account_no}</td>
                <td>{curUser.consumer_name}</td>
                <td>{curUser.total_bal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};*/
import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import ConsumerPDFViewer from "./ConsumerPDFViewer";
import NoDataModal from "./NoDataModal";
import "./monthlyAuditData.css";

export const MonthlyAuditData = () => {
  const [users, setUsers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showNoDataModal, setShowNoDataModal] = useState(false);
  const { authorizationToken } = useAuth();

  // Function to fetch consumer data
  const fetchAllConsumerData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/allConsumers", {
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
    return users.filter(user => {
      const userMonth = new Date(user.date).getMonth() + 1;
      return userMonth === parseInt(month);
    });
  };

  // Effect to fetch data on component mount
  useEffect(() => {
    fetchAllConsumerData();
  }, []);

  // Handler for month selection change
  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);

    // Check if there are users for the selected month
    const filteredUsers = filterByMonth(users, month);
    if (filteredUsers.length === 0) {
      setShowNoDataModal(true);
    }
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setShowNoDataModal(false);
  };

  // Filtered users based on selected month
  const filteredUsers = selectedMonth ? filterByMonth(users, selectedMonth) : users;

  return (
    <section className="admin-users-section">
      <div className="allConsumerContainer">
        <p>All Consumers Total Amount is: {totalAmount}</p>
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

      {selectedMonth && (
        <div className="pdf-viewer-container">
          <ConsumerPDFViewer data={filteredUsers} totalAmount={totalAmount} />
        </div>
      )}

      <div>
        <table className="consumer-table">
          <thead>
            <tr className="table-header">
              <th>Date</th>
              <th>Transaction No</th>
              <th>Account Number</th>
              <th>Consumer Name</th>
              <th>Total Balance</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((curUser) => (
              <tr key={curUser._id}>
                <td>{curUser.date}</td>
                <td>{curUser.transaction_no}</td>
                <td>{curUser.account_no}</td>
                <td>{curUser.consumer_name}</td>
                <td>{curUser.total_bal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showNoDataModal && (
        <NoDataModal onClose={handleCloseModal} />
      )}
    </section>
  );
};

