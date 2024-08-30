import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

export const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const params = useParams();
  const { authorizationToken } = useAuth();

  // get single user data
  const singleDataById = async () => {
    try {
      const response = await fetch(`https://gfst-server.vercel.app/api/admin/users/${params.id}`, {
        method: "get",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const dataFromServer = await response.json();
      console.log("user single data:", dataFromServer);
      setData(dataFromServer);
    } catch (error) {
      console.log(error);
    }
  };

  // get the single user data
  useEffect(() => {
    singleDataById();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to update the admin data?")) {
      try {
        const response = await fetch(`https://gfst-server.vercel.app/api/admin/users/update/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          toast.success("Now login using this email");
        } else {
          toast.error("Sorry, Admin data  updated");
        }
      } catch (error) {
        console.log({ message: error.message });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <section className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <main>
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800">Update User Information</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-gray-700 font-semibold">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                id="username"
                required
                autoComplete="off"
                value={data?.username || ""}
                onChange={handleInput}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                id="email"
                required
                autoComplete="off"
                value={data?.email || ""}
                onChange={handleInput}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 font-semibold">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                id="phone"
                required
                autoComplete="off"
                value={data?.phone || ""}
                onChange={handleInput}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Update
            </button>
          </form>
        </main>
      </section>
    </div>
  );
};
