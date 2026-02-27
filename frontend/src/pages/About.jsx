import React from "react";

const AboutUs = () => {
  const team = [
    { name: "Shital Bhade", tech: "Backend Developer", img: "https://randomuser.me/api/portraits/women/45.jpg" },
    { name: "Supriya Kore", tech: "Frontend Developer", img: "https://randomuser.me/api/portraits/women/50.jpg" },
    { name: "Mansi Shinde", tech: "Frontend Developer, UI/UX", img: "https://randomuser.me/api/portraits/women/65.jpg" },
    { name: "Renuka Sonawane", tech: "Backend Developer", img: "https://randomuser.me/api/portraits/women/68.jpg" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      {/* Project Title + Info */}
      <header className="w-full text-center py-12 border-b">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 text-transparent bg-clip-text mb-6">
          🩺 Osteoporosis Prediction
        </h1>
        <div className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed space-y-4">
          <p>
            Osteoporosis is a silent disease that weakens bones and makes them
            more likely to break. Often, people don’t realize they have it until
            a fracture occurs, which makes early detection extremely important.
            Our project, <strong>Osteoporosis Prediction</strong>, focuses on
            applying cutting-edge data science and machine learning techniques
            to identify individuals at risk before it’s too late.
          </p>
          <p>
            By analyzing patient health records, lifestyle patterns, and medical
            history, our system aims to provide accurate predictions and early
            warning signs. This proactive approach will not only support doctors
            in making faster and more reliable diagnoses but also help patients
            take preventive measures.
          </p>
        </div>
        {/* Colored Divider */}
        <div className="mt-8 w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-700 mx-auto rounded-full"></div>
      </header>

      {/* Vision & Mission */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 py-16 text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 text-transparent bg-clip-text mb-12">
          Vision & Mission
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Vision Card */}
          <div className="bg-white border border-indigo-300 p-8 rounded-2xl shadow-lg hover:shadow-indigo-200 hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-bold text-indigo-700 mb-4">Our Vision</h3>
            <p className="leading-relaxed text-gray-700">
              Our vision is to build a future where osteoporosis no longer goes
              unnoticed. We aim to create technology that empowers doctors and
              patients to detect bone health risks early, reducing fractures and
              life-threatening complications.
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-white border border-indigo-300 p-8 rounded-2xl shadow-lg hover:shadow-indigo-200 hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-bold text-indigo-700 mb-4">Our Mission</h3>
            <p className="leading-relaxed text-gray-700">
              Our mission is to leverage artificial intelligence and medical
              data to accurately predict osteoporosis risk in patients. By
              combining innovation, compassion, and technology, we strive to
              reduce suffering, increase awareness, and contribute to stronger,
              healthier communities.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 text-transparent bg-clip-text mb-10">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md border-2 border-indigo-400 hover:shadow-indigo-300 hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-200 hover:border-purple-400 transition duration-300"
              />
              <h4 className="text-xl font-bold text-indigo-700">{member.name}</h4>
              <p className="text-sm text-gray-600 mt-2">{member.tech}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;