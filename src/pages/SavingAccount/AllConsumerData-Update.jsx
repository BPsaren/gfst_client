import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

export const UpdateConsumerData = () => {
  const [data, setData] = useState({
    date: "",
    transaction_no:"",
    account_no: "",
    consumer_name: "",
    address: "",
    aadhar_no: "",
    mobile_no:"",
    mail_id:"",
    opening_bal:"",
    total_bal:"",
  });

  const params = useParams();
  const { authorizationToken } = useAuth();

  useEffect(() => {
    const fetchConsumerData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/admin/allConsumers/${params.id}`, {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        });
        const dataFromServer = await response.json();
        setData(dataFromServer);
      } catch (error) {
        console.log(error);
      }
    };

    fetchConsumerData();
  }, [authorizationToken, params.id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/admin/allConsumers/update/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("User data updated successfully");
      } else {
        toast.error("Sorry, user data not updated");
      }
    } catch (error) {
      console.log({message: error.message});
    }
  };

  return (
    <div>
      <section>
        <main>
          <div className="section-registration">
            <h1>Update Consumer Data</h1>
            <br/>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="date"> Date</label>
                <input 
                  type="date" 
                  name="date"
                  placeholder="Enter your date"
                  id="date"
                  required 
                  autoComplete="off"
                  value={data.date}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="account_number"> Account Number</label>
                <input 
                  type="text" 
                  name="account_no"
                  placeholder="Enter account number"
                  id="text"
                  required 
                  autoComplete="off"
                  value={data.account_no}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="consumer_name"> Consumer Name</label>
                <input 
                  type="text" 
                  name="consumer_name"
                  placeholder="Enter consumer name"
                  id="text"
                  required 
                  autoComplete="off"
                  value={data.consumer_name}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="address"> Address</label>
                <input 
                  type="text" 
                  name="address"
                  placeholder="Enter your address"
                  id="text"
                  required 
                  autoComplete="off"
                  value={data.address}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="aadhar_no"> Aadhar Number</label>
                <input 
                  type="number" 
                  name="aadhar_no"
                  placeholder="Enter your Aadhar number"
                  id="text"
                  required 
                  autoComplete="off"
                  value={data.aadhar_no}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="mobile_no"> Mobile Number</label>
                <input 
                  type="number" 
                  name="mobile_no"
                  placeholder="Enter your mobile number"
                  id="text"
                  required 
                  autoComplete="off"
                  value={data.mobile_no}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="mail_id"> Gmail id</label>
                <input 
                  type="email" 
                  name="mail_id"
                  placeholder="Enter your email address"
                  id="text"
                  required 
                  autoComplete="off"
                  value={data.mail_id}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="opening_bal"> Opening balance</label>
                <input 
                  type="text" 
                  name="opening_bal"
                  placeholder="Enter opening balance"
                  id="text"
                  required 
                  autoComplete="off"
                  value={data.opening_bal}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="total_bal"> Total Balance</label>
                <input 
                  type="text" 
                  name="total_bal"
                  placeholder="Enter Total Balance"
                  id="text"
                  required 
                  autoComplete="off"
                  value={data.total_bal}
                  onChange={handleInput}
                />
              </div>

              {/* Repeat this pattern for other input fields */}
              <button type="submit">Save</button>
            </form>
          </div>
        </main>
        <section></section>
      </section>
    </div>
  );
};
