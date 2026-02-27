import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server error, please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Welcome Panel */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Join Us!</h1>
        <p className="text-base md:text-lg text-center mb-6">Create your account and start your journey with us.</p>
        <img
          src="https://media.istockphoto.com/id/1208288115/photo/joint-body-pain.jpg?s=612x612&w=0&k=20&c=dYA53mj-g9omqe4j8c95ppByBmfzQBWrCalqcgLufh4="
          alt="Signup Visual"
          className="rounded-lg shadow-lg w-[80%] h-[200px] md:h-[340px] object-cover"
        />
      </div>

      {/* Right side - Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>

          <form className="space-y-4 md:space-y-5" onSubmit={handleSignup}>
            <div>
              <label className="block text-gray-700 mb-1 text-base md:text-lg">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 md:px-5 md:py-3 border text-sm md:text-base rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 text-base md:text-lg">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 md:px-5 md:py-3 border text-sm md:text-base rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 text-base md:text-lg">Password</label>
              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 md:px-5 md:py-3 border text-sm md:text-base rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 text-base md:text-lg">Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 md:px-5 md:py-3 border text-sm md:text-base rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 md:py-3 text-base md:text-lg rounded-md hover:bg-indigo-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Already have an account?
            <Link to="/login" className="text-indigo-600 font-semibold ml-1 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
