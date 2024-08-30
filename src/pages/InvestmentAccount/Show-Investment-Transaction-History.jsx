import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { useParams } from "react-router-dom";
import './showInvestmentTransactionHistory.css'; // Import the external CSS file
import TransactionPDFViewer from './TransactionPDFViewer'; // Import the updated PDF viewer component
import { PDFDownloadLink } from '@react-pdf/renderer';

export const ShowInvestMentTransactionHistory = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const { authorizationToken } = useAuth();
    const { account_no } = useParams();

    const fetchAllConsumerData = async () => {
        try {
            const response = await fetch(`https://gfst-server.vercel.app/api/admin/transactioninvestnhistory/${account_no}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchAllConsumerData();
    }, [account_no]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter((user) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            (user.transaction_no && user.transaction_no.toLowerCase().includes(searchLower)) ||
            (user.type && user.type.toLowerCase().includes(searchLower))
        );
    });

    const consumerInfo = users.length > 0 ? users[0] : {};

    return (
        <section className="transaction-history-section">
            <div className="container">
                {consumerInfo && (
                    <div className="consumer-details-investment">
                        <p><strong>Account Number:</strong> {consumerInfo.account_no}</p>
                        <p><strong>Consumer Name:</strong> {consumerInfo.consumer_name}</p>
                        <p><strong>Address:</strong> {consumerInfo.address}</p>
                        <p><strong>Aadhar Number:</strong> {consumerInfo.aadhar_no}</p>
                        <p><strong>Mobile Number:</strong> {consumerInfo.mobile_no}</p>
                        <p><strong>Email:</strong> {consumerInfo.mail_id}</p>
                    </div>
                )}
                <input
                    type="text"
                    placeholder="Search by Transaction Number or Type"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input-investment"
                />
            </div>
            <PDFDownloadLink
                document={<TransactionPDFViewer data={filteredUsers} consumerInfo={consumerInfo} />}
                fileName="transaction-history.pdf"
            >
                {({ loading }) => (
                    <button className="print-button-of-transaction">
                        {loading ? "Generating PDF..." : "Download PDF"}
                    </button>
                )}
            </PDFDownloadLink>
            <div className="table-container-investment">
                <table className="transaction-table">
                    <thead>
                        <tr className="table-header">
                            <th>Transaction ID</th>
                            <th>Date</th>
                            <th>Transaction Type</th>
                            <th>Total Amount</th>
                            <th>EMI</th>
                            <th>Amount Recovery</th>
                            <th>Remaining Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((curUser) => (
                            <tr key={curUser._id} className="table-row">
                                <td>{curUser.transaction_no}</td>
                                <td>{new Date(curUser.date).toLocaleDateString()}</td>
                                <td>{curUser.type}</td>
                                <td>{curUser.investment_of_customers_business}</td>
                                <td>{curUser.profit_on_customer_investment}</td>
                                <td>{curUser.amount_of_investment_recovery}</td>
                                <td>{curUser.individual_total__investment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </section>
    );
};
