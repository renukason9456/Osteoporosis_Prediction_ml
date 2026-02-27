import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      const userData = {
        name: data.name,
        email: email,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      navigate("/predict");
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex flex-col justify-center items-center p-8 md:p-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Welcome!</h1>
        <p className="text-lg md:text-xl text-center mb-6">
          Sign in to access your dashboard and manage your account.
        </p>
        <img
          src="https://media.istockphoto.com/id/1208288115/photo/joint-body-pain.jpg?s=612x612&w=0&k=20&c=dYA53mj-g9omqe4j8c95ppByBmfzQBWrCalqcgLufh4="
          alt="Login Visual"
          className="rounded-lg shadow-lg w-[80%] h-[200px] md:h-[340px] object-cover"
        />
      </div>

      {/* Right side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
            Login
          </h2>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-base text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-200 text-base"
              />
            </div>

            <div>
              <label className="block text-base text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-200 text-base"
              />
              <div className="text-right text-sm mt-1">
                <a href="#" className="text-indigo-600 hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 text-base rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Log In
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don’t have an account?
            <Link to="/signup" className="text-indigo-600 font-semibold ml-1 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
