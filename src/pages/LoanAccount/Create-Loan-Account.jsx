import React, { useState } from "react";
import { useAuth } from "../../store/auth";
import { toast } from 'react-toastify';
import './adminCreateLoanAccount.css'; // Import the external CSS

const defaultContactFormData = {
  date: '',
  transaction_no: '',
  account_no: '',
  consumer_name: '',
  address: '',
  aadhar_no: '',
  mobile_no: '',
  mail_id: '',
  starting_loan: ''
};

export const AdminCreateLoanAccount = () => {
  const [member, setMember] = useState(defaultContactFormData);
  const { authorizationToken } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setMember({
      ...member,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirmation dialog
    const confirmed = window.confirm("Re-check your credentials data because after creating the account, you cannot edit it. Are you sure you want to proceed?");
    if (!confirmed) return;

    try {
      const response = await fetch("http://localhost:3000/api/admin/admincreateloanaccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(member),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating account:", errorData);
        toast.error(errorData.extraDetails ? errorData.extraDetails : errorData.message);
      } else {
        setMember(defaultContactFormData);
        const data = await response.json();
        console.log(data);
        toast.success("Loan Account created successfully");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Account not created");
    }
  };

  return (
    <div className="form-container">
      <div className="form-section">
        <h1 className="form-heading">Create Loan Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="consumer_name" className="form-label">Consumer Name</label>
            <input
              type="text"
              name="consumer_name"
              placeholder="Enter consumer name"
              required
              autoComplete="off"
              className="form-input"
              value={member.consumer_name}
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter address"
              required
              autoComplete="off"
              className="form-input"
              value={member.address}
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="aadhar_no" className="form-label">Aadhar Number</label>
            <input
              type="number"
              name="aadhar_no"
              placeholder="Enter Aadhar number"
              required
              autoComplete="off"
              className="form-input"
              value={member.aadhar_no}
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile_no" className="form-label">Mobile Number</label>
            <input
              type="number"
              name="mobile_no"
              placeholder="Enter mobile number"
              required
              autoComplete="off"
              className="form-input"
              value={member.mobile_no}
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mail_id" className="form-label">Email</label>
            <input
              type="email"
              name="mail_id"
              placeholder="Enter email address"
              required
              autoComplete="off"
              className="form-input"
              value={member.mail_id}
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="starting_loan" className="form-label">Loan Credit</label>
            <input
              type="number"
              name="starting_loan"
              placeholder="Enter Loan Amount"
              required
              autoComplete="off"
              className="form-input"
              value={member.starting_loan}
              onChange={handleInput}
            />
          </div>
          <button type="submit" className="form-button">Submit</button>
        </form>
      </div>
    </div>
  );
};
