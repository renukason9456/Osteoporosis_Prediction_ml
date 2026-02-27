import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");

    if (loggedUser) {
      const { name, email } = JSON.parse(loggedUser);

      // Fetch full user data from backend
      fetch(`http://localhost:5000/api/users/${email}`)
        .then(res => res.json())
        .then(data => {
          setUser(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!user)
    return <p className="text-center mt-20 text-gray-500">Please login to see profile.</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-96 text-center">
        <div className="w-24 h-24 rounded-full bg-purple-600 text-white flex items-center justify-center mx-auto text-4xl mb-4">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
        <p className="text-gray-600 mb-4">{user.email}</p>

        <div className="text-left mt-6">
          <h3 className="font-semibold mb-1">Account Details:</h3>
          <p><strong>Username:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
