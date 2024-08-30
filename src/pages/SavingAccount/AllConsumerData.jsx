import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { Link } from "react-router-dom";
import "./allConsumerData.css"; // Ensure the correct CSS file is imported

export const AllConsumerData = () => {
  const [users, setUsers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { authorizationToken } = useAuth();

  const fetchAllConsumerData = async () => {
    try {
      const response = await fetch("https://gfst-server.vercel.app/api/admin/allConsumers", {
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

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this consumer account?")) {
      try {
        const response = await fetch(`https://gfst-server.vercel.app/api/admin/allConsumers/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        });

        if (response.ok) {
          alert("User deleted successfully");
          fetchAllConsumerData();
        } else {
          alert("Failed to delete user");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteSelectedUsers = async () => {
    if (window.confirm("Are you sure you want to delete the selected consumer accounts?")) {
      try {
        const deleteRequests = selectedUsers.map(id =>
          fetch(`https://gfst-server.vercel.app/api/admin/allConsumers/delete/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: authorizationToken,
            },
          })
        );

        const responses = await Promise.all(deleteRequests);
        const allSuccessful = responses.every(response => response.ok);

        if (allSuccessful) {
          alert("Selected users deleted successfully");
          setSelectedUsers([]);
          fetchAllConsumerData();
        } else {
          alert("First withdraw all money");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchAllConsumerData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCheckboxChange = (id) => {
    setSelectedUsers(prevState =>
      prevState.includes(id)
        ? prevState.filter(userId => userId !== id)
        : [...prevState, id]
    );
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.account_no.toLowerCase().includes(searchLower) ||
      user.consumer_name.toLowerCase().includes(searchLower) ||
      user.transaction_no.toLowerCase().includes(searchLower) ||
      user.aadhar_no.toLowerCase().includes(searchLower) 
    );
  });

  return (
    <section className="admin-users-section">
      <div className="ConsumerListContainer">
        <p>
          All Consumers Total Amount is:<span>{totalAmount}</span>
        </p>
      </div>
      <input
        type="text"
        placeholder="Search by Account Number or Consumer Name or Transaction No or Aadhaar No"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="marquee">
        <p>**If you want to see the transaction history then press on Account number**</p>
      </div>
      {selectedUsers.length > 0 && (
        <button onClick={deleteSelectedUsers} className="delete-button">
          Delete Selected Consumers
        </button>
      )}
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th className="checkbox-cell"></th>
              <th>Date</th>
              <th>Transaction No</th>
              <th>Account Number</th>
              <th>Consumer Name</th>
              <th>Address</th>
              <th>Aadhaar No</th>
              <th>Mobile Number</th>
              <th>Mail Id</th>
              <th>Total Balance</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((curUser) => (
              <tr key={curUser._id}>
                <td className="checkbox-cell">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(curUser._id)}
                    onChange={() => handleCheckboxChange(curUser._id)}
                  />
                </td>
                <td>{curUser.date}</td>
                <td>{curUser.transaction_no}</td>
                <td>
                  <Link to={`/admin/transactionhistory/${curUser.account_no}/datafetch`}>
                    {curUser.account_no}
                  </Link>
                </td>
                <td>{curUser.consumer_name}</td>
                <td>{curUser.address}</td>
                <td>{curUser.aadhar_no}</td>
                <td>{curUser.mobile_no}</td>
                <td>{curUser.mail_id}</td>
                <td>{curUser.total_bal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
