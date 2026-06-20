import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (newPassword !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    const res = await fetch(
      "http://localhost:5000/api/auth/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    alert("Password updated successfully!");
  } catch (err) {
    console.error(err);
    setError("Server error");
  }
};

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex flex-col justify-center items-center p-8 md:p-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Reset Password
        </h1>

        <p className="text-lg md:text-xl text-center mb-6">
          Enter your email and create a new password.
        </p>

        <img
          src="https://media.istockphoto.com/id/1208288115/photo/joint-body-pain.jpg?s=612x612&w=0&k=20&c=dYA53mj-g9omqe4j8c95ppByBmfzQBWrCalqcgLufh4="
          alt="Forgot Password"
          className="rounded-lg shadow-lg w-[80%] h-[200px] md:h-[340px] object-cover"
        />
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
            Forgot Password
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-base text-gray-700 mb-1">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-200 text-base"
                required
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-base text-gray-700 mb-1">
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-200 text-base"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-base text-gray-700 mb-1">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-200 text-base"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            {/* Reset Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 text-base rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Reset Password
            </button>

            {/* Back to Login */}
            <div className="text-center mt-4">
              <Link
                to="/login"
                className="text-purple-600 font-semibold hover:underline"
              >
                ← Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;