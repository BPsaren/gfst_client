import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { Link } from "react-router-dom";
import "./AdminUsers.css"; // Importing the external CSS

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const { authorizationToken } = useAuth();

    const getAllUsersData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/admin/users", {
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
            console.error(error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            const data = await response.json();
            alert("User deleted successfully");
            if (response.ok) {
                getAllUsersData();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllUsersData();
    }, []);

    return (
        <>
            <section className="admin-users-section">
                <div className="tablecontainer">
                    <h1 className="AdminUserData">Admin users data</h1>
                </div>

                <div className="table-container"> {/* Added container for scroll */}
                    <table>
                        <thead>
                            <tr>
                           
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Update</th>
                                <th>Delete</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                        {users?.map((curUser, index) => (
  <tr key={index}>
    <td>{curUser.username}</td>
    <td>{curUser.email}</td>
    <td>{curUser.phone}</td>
    <td><Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link></td>
    <td><button onClick={() => deleteUser(curUser._id)}>Delete</button></td>
  </tr>
))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};
