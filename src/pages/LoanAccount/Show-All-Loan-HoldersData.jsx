import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { Link } from "react-router-dom";
import './getAllLoanHolders.css'; // Import the external CSS

export const GetAllLoanHolders = () => {
  const [users, setUsers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0); // State for totalAmount
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const { authorizationToken } = useAuth();

  const fetchAllConsumerData = async () => {
    try {
      const response = await fetch("https://gfst-server.vercel.app/api/admin/getallloanholders", {
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
        setTotalAmount(data.totalAmount); // Set totalAmount
      } else {
        console.error("Data is not an array:", data);
        setUsers([]);
      }
    } catch (error) {
      console.error(error);
      setUsers([]);
    }
  };

  const deleteUser = async (id) => {
    // Confirmation dialog
    const confirmed = window.confirm("Are you sure you want to delete this consumer loan account?");
    if (!confirmed) return;

    try {
      const response = await fetch(`https://gfst-server.vercel.app/api/admin/getallloanholders/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        alert("User deleted successfully");
        fetchAllConsumerData();
      } else {
        alert("First Deposit ALl Due EMI");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllConsumerData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (user.account_no && user.account_no.toLowerCase().includes(searchLower)) ||
      (user.consumer_name && user.consumer_name.toLowerCase().includes(searchLower)) || 
      (user.transaction_no && user.transaction_no.toLowerCase().includes(searchLower))
    );
  });

  return (
    <section className="admin-users-section">
      <div className="containerp">
        <p className="total-amount">All Consumers Total Amount: {totalAmount}</p>
        <input
          type="text"
          className="search-input"
          placeholder="Search by Account Number or Consumer Name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="">
        <p>**If you want to see the loan transaction history then press on Account number**</p>
      </div>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr className="table-header">
              <th>Date</th>
              <th>Trans.No</th>
              <th>Account Number</th>
              <th>Consumer Name</th>
              <th>Address</th>
              <th>Aadhar No</th>
              <th>Mobile Number</th>
              <th>Mail Id</th>
              <th>Total Loan Credit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((curUser) => (
              <tr key={curUser._id} className="table-row">
                <td>{curUser.date}</td>
                <td>{curUser.transaction_no}</td>
                <td>
                  <Link to={`/admin/transactionloanhistory/${curUser.account_no}/loandatafetch`} className="link">
                    {curUser.account_no}
                  </Link>
                </td>
                <td>{curUser.consumer_name}</td>
                <td>{curUser.address}</td>
                <td>{curUser.aadhar_no}</td>
                <td>{curUser.mobile_no}</td>
                <td>{curUser.mail_id}</td>
                <td>{curUser.total_loan_credit}</td>
                <td>
                  <button className="delete-button" onClick={() => deleteUser(curUser._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
