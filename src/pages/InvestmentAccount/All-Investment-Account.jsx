import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { Link } from "react-router-dom";
import './allInvestmentAccount.css'; // Import the external CSS file

export const AllInvestmentAccount = () => {
  const [users, setUsers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0); // State for totalAmount
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const { authorizationToken } = useAuth();

  const fetchAllConsumerData = async () => {
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
    const confirmed = window.confirm("Are you sure you want to delete this investment account?");
    if (!confirmed) return; // If the user clicks "Cancel", do not proceed
  
    try {
      const response = await fetch(`http://localhost:3000/api/admin/getallinvestments/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
  
      if (response.ok) {
        alert("Investment account deleted successfully");
        fetchAllConsumerData();
      } else {
        alert("First Paid All Due Amount");
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
      <div className="containery">
        
        <p className="total-amount">All Consumers Total Amount is: {totalAmount}</p>
        <input
          type="text"
          placeholder="Search by Account Number or Consumer Name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="table-container">
        <table className="investment-table">
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
              <th>Total Loan for Business</th>
              <th>Update</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((curUser) => (
              <tr key={curUser._id} className="table-row">
                <td>{curUser.date}</td>
                <td>{curUser.transaction_no}</td>
                <td>
                  <Link to={`/admin/transactioninvestnhistory/${curUser.account_no}/investdatafetch`} className="account-link">
                    {curUser.account_no}
                  </Link>
                </td>
                <td>{curUser.consumer_name}</td>
                <td>{curUser.address}</td>
                <td>{curUser.aadhar_no}</td>
                <td>{curUser.mobile_no}</td>
                <td>{curUser.mail_id}</td>
                <td>{curUser.individual_total__investment}</td>
                <td className="actions">
                  <Link to={`/admin/allConsumers/${curUser._id}/edit`} className="edit-link">
                    Edit
                  </Link>
                  </td>

                  <td>
                  <button onClick={() => deleteUser(curUser._id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
