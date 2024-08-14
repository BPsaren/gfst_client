import React, { useState } from "react";
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';
import './withdrawAmount.css';

const defaultContactFormData = {
  type: 'withdraw',
  date: '',
  account_no: '',
  transaction_no: '',
  withdraw_bal: '',
  remarks: ''
};

export const WithdrawAmount = () => {
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
    if (window.confirm("Are you sure you want to withdraw this amount?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/admin/withdraw`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(member),
        });

        if (response.ok) {
          setMember(defaultContactFormData);
          const data = await response.json();
          console.log(data);
          toast.success("Money withdrawn successfully");
        } else {
          const errorData = await response.json();
          toast.error(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error withdrawing money:", error);
        toast.error("Money not withdrawn");
      }
    }
  };

  return (
    <div className="withdraw-container">
      <section>
        <main>
          <div className="withdraw-section">
            <h1 className="withdraw-heading">Withdraw Money</h1>
            <br />
            <form onSubmit={handleSubmit}>
              <div className="withdraw-group">
                <label htmlFor="account_no" className="withdraw-label">Account Number</label>
                <input 
                  type="number" 
                  name="account_no"
                  id="account_no"
                  placeholder="Enter account number"
                  required 
                  autoComplete="off"
                  value={member.account_no}
                  onChange={handleInput}
                  className="withdraw-input"
                />
              </div>
              <div className="withdraw-group">
                <label htmlFor="withdraw_bal" className="withdraw-label">Withdraw Amount</label>
                <input 
                  type="number" 
                  name="withdraw_bal"
                  id="withdraw_bal"
                  placeholder="Withdraw amount"
                  required 
                  autoComplete="off"
                  value={member.withdraw_bal}
                  onChange={handleInput}
                  className="withdraw-input"
                />
              </div>
              <button type="submit" className="withdraw-button">Withdraw</button>
            </form>
          </div>
        </main>
      </section>
    </div>
  );
};
