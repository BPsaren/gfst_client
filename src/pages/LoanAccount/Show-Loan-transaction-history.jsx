import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { useParams } from "react-router-dom";
import ConsumerPDFViewer from "./ConsumerPDFViewer"; // Import the PDF viewer component
import { toast } from 'react-toastify'; // Import react-toastify for notifications
import { PDFDownloadLink } from '@react-pdf/renderer'; // Import PDFDownloadLink
import "./transactionHistory.css";

export const ShowTransactionLoanHistory = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const { authorizationToken } = useAuth();
    const { account_no } = useParams();

    const fetchAllConsumerData = async () => {
        try {
            const response = await fetch(`https://gfst-server.vercel.app/api/admin/transactionloanhistory/${account_no}`, {
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
            toast.error("Error fetching data");
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`https://gfst-server.vercel.app/api/admin/transactionloanhistory/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                toast.success("Transaction deleted successfully");
                fetchAllConsumerData();
            } else {
                toast.error("Failed to delete transaction");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete transaction");
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
    const totalAmount = users.reduce((acc, cur) => acc + Number(cur.total_loan_credit), 0); // Calculate total amount

    return (
        <section className="transaction-loan-history">
            <div className="containers">
                {consumerInfo && (
                    <div className="consumer-loan-details">
                        <p><strong>Account Number:</strong> {consumerInfo.account_no}</p>
                        <p><strong>Consumer Name:</strong> {consumerInfo.consumer_name}</p>
                        <p><strong>Address:</strong> {consumerInfo.address}</p>
                        <p><strong>Aadhar Number:</strong> {consumerInfo.aadhar_no}</p>
                        <p><strong>Mobile Number:</strong> {consumerInfo.mobile_no}</p>
                        <p><strong>Email:</strong> {consumerInfo.mail_id}</p>
                    </div>
                )}
                <div>
                    <input
                        type="text"
                        placeholder="Search by Transaction Number or Type"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-loan-input"
                    />
                    <PDFDownloadLink
                        document={<ConsumerPDFViewer data={filteredUsers} consumerInfo={consumerInfo} />}
                        fileName="transaction-history.pdf"
                    >
                        {({ loading }) => (
                            <button className="print-button-of-transaction">
                                {loading ? "Generating PDF..." : "Download PDF"}
                            </button>
                        )}
                    </PDFDownloadLink>
                </div>
                <div className="table-container">
                    <table className="transaction-table">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Date</th>
                                <th>Transaction Type</th>
                                <th>Total Loan Amount</th>
                                <th>EMI</th>
                                <th>Amount Of Loan Recovery</th>
                                <th>Remaining Loan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((curUser) => (
                                <tr key={curUser._id}>
                                    <td>{curUser.transaction_no}</td>
                                    <td>{new Date(curUser.date).toLocaleDateString()}</td>
                                    <td>{curUser.type}</td>
                                    <td>{curUser.starting_loan}</td>
                                    <td>{curUser.loan_deposit}</td>
                                    <td>{curUser.amount_of_loan_recovery}</td>
                                    <td>{curUser.total_loan_credit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};
