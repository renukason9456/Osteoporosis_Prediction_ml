// src/Contact.jsx
import React, { useState, useEffect } from "react";

const experts = [
  { name: "Dr. Sarah Collins", specialization: "Orthopedic Specialist", info: "Expert in bone density and osteoporosis management." },
  { name: "Dr. Rajesh Kumar", specialization: "Endocrinologist", info: "Focus on hormonal causes of osteoporosis." },
  { name: "Dr. Emily Johnson", specialization: "Rheumatologist", info: "Specializes in bone and joint health." },
  { name: "Dr. Michael Lee", specialization: "Geriatric Physician", info: "Works on elderly bone health and fracture prevention." },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Fetch logged-in user info from localStorage (if stored after login)
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    if (storedName) setFormData(prev => ({ ...prev, name: storedName }));
    if (storedEmail) setFormData(prev => ({ ...prev, email: storedEmail }));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("⚠️ Please fill all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("✅ Message sent successfully!");
        setFormData(prev => ({ ...prev, message: "" })); // clear message
      } else {
        setStatus("❌ Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Error sending message.");
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700 text-center mb-10">
        Our Top Osteoporosis Experts
      </h1>

      {/* Expert Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {experts.map((exp, idx) => (
          <div
            key={idx}
            className="bg-white border-2 border-purple-500 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-1 text-purple-700">{exp.name}</h2>
            <p className="text-purple-500 font-medium mb-2">{exp.specialization}</p>
            <p className="text-gray-700 text-sm">{exp.info}</p>
          </div>
        ))}
      </div>

      {/* Reach Out Form */}
      <div className="max-w-xl mx-auto bg-white border-2 border-purple-500 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-purple-700 mb-6 text-center">
          Reach Out
        </h2>
        {status && <p className="text-center mb-4">{status}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-2 border-2 border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
            readOnly={!!localStorage.getItem("userName")}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full px-4 py-2 border-2 border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
            readOnly={!!localStorage.getItem("userEmail")}
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={4}
            className="w-full px-4 py-2 border-2 border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold shadow-md hover:from-purple-700 hover:to-purple-800 hover:shadow-lg transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
