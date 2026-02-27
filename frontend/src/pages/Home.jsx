// src/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const resources = [
  {
    title: "Bone Health Tips",
    description: "Learn how to maintain strong bones with daily habits and exercises.",
    icon: "🦴",
  },
  {
    title: "Nutrition Guide",
    description: "Essential nutrients for bone strength and osteoporosis prevention.",
    icon: "🥦",
  },
  {
    title: "Doctor Consultations",
    description: "Know when and why to consult a specialist for bone health.",
    icon: "👨‍⚕️",
  },
  {
    title: "Exercise Routines",
    description: "Recommended weight-bearing and resistance exercises for all ages.",
    icon: "🏋️‍♂️",
  },
  {
    title: "Myths & Facts",
    description: "Separate myths from facts about bone health and osteoporosis.",
    icon: "❓",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center text-center py-16 px-4">
      {/* Illustration */}
      <img
        src="https://images.unsplash.com/photo-1508387027939-27cccde53673?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9uZSUyMHN0eWxlZHxlbnwwfHwwfHx8MA%3D%3D"
        alt="3D bone structure illustration"
        className="w-40 sm:w-52 md:w-64 lg:w-72 mb-8 rounded-full border border-gray-200 shadow-[0_8px_20px_rgba(126,34,206,0.2)] object-cover aspect-square"
      />

      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-purple-700 mb-4">
        BoneGuard
      </h1>

      {/* Subtitle */}
      <h2 className="text-2xl md:text-3xl font-medium text-gray-700 mb-8">
        AI-Powered Osteoporosis Detection System
      </h2>

      {/* Description */}
      <p className="max-w-2xl text-gray-600 text-lg mb-10">
        BoneGuard helps healthcare professionals identify bone health issues through intelligent scanning
        and predictive algorithms. Upload your data and let the AI handle the diagnosis — non-invasive,
        accurate, and fast.
      </p>

      {/* CTA Button */}
      <button
        onClick={() => navigate('/login')}
        className="bg-gradient-to-r from-purple-700 to-purple-400 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105"
        aria-label="Get started with BoneGuard"
      >
        GET STARTED
      </button>

      {/* Bone Health Library */}
      <div className="w-full max-w-7xl mt-20 p-6 md:p-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700 text-center mb-10">
          Bone Health Library
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((res, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-purple-500 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105"
              role="region"
              aria-labelledby={`resource-title-${idx}`}
            >
              <div className="text-4xl mb-4" aria-hidden="true">{res.icon}</div>
              <h2 id={`resource-title-${idx}`} className="text-xl font-semibold mb-2 text-purple-700">
                {res.title}
              </h2>
              <p className="text-gray-700">{res.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
