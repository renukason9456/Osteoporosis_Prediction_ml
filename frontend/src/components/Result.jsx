import React from "react";

const Result = ({ output }) => {
  if (!output || Object.keys(output).length === 0) {
    return null; // Nothing to display
  }

  const {
    name,
    age,
    gender,
    status,
    tscore,
    fractureRisk,
    severity,
    diet,
    lifestyle,
    doctor,
    badge,
    bmi,
    Osteoporosis_Prediction, // NEW FIELD
  } = output;

  const resultItems = [
    { label: "Name", value: name },
    { label: "Age", value: age },
    { label: "Gender", value: gender },
    { label: "Status", value: status },
    { label: "T-score", value: tscore },
    { label: "Fracture Risk", value: fractureRisk },
    { label: "Severity", value: severity },
    { label: "BMI", value: bmi },
    { label: "Osteoporosis Prediction", value: Osteoporosis_Prediction }, // SHOW PREDICTION
    { label: "Diet Suggestion", value: diet },
    { label: "Lifestyle Suggestion", value: lifestyle },
    { label: "Doctor Suggestion", value: doctor },
    { label: "Health Badge", value: badge },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white shadow-2xl rounded-3xl border border-gray-200 my-6">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-10">
        ✅ Prediction Result
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
        {resultItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-indigo-50 relative p-6 rounded-2xl border-l-8 border-indigo-500 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105 cursor-default"
          >
            <p className="font-semibold text-lg mb-2">{item.label}</p>
            <p
              className={`text-gray-700 text-base ${
                item.label === "Osteoporosis Prediction"
                  ? item.value === "Yes"
                    ? "text-red-600 font-bold"
                    : "text-green-600 font-bold"
                  : ""
              }`}
            >
              {item.value || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
