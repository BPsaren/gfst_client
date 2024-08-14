import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from 'react-toastify';

export const Login = () => {
  const [loginUser, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  // handle the input information
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...loginUser,
      [name]: value,
    });
  };

  // handling for the form submission process
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
      });
      const res_data = await response.json();

      if (response.ok) {
        storeTokenInLS(res_data.token);
        toast.success("Login successful");
        setUser({
          email: "",
          password: "",
        });
        navigate("/admin");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      toast.error("Login error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <section className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <main>
          <div className="section-registration">
            <h1 className="text-2xl font-bold text-center">Log in Now</h1>
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  autoComplete="off"
                  placeholder="Enter your email address"
                  value={loginUser.email}
                  onChange={handleInput}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  autoComplete="off"
                  placeholder="Enter your password"
                  value={loginUser.password}
                  onChange={handleInput}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white font-medium text-sm leading-5 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Now
              </button>
            </form>
          </div>
        </main>
      </section>
    </div>
  );
};
