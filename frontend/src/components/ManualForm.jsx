import React, { useState } from "react";
import { Listbox } from "@headlessui/react";

const ManualForm = ({ onResult }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    bloodGroup: "",
    symptoms: "",
    hormonalChanges: "",
    familyHistory: "",
    race: "",
    calciumIntake: "",
    vitaminDIntake: "",
    physicalActivity: "",
    smoking: "",
    alcohol: "",
    medicalConditions: "",
    medications: "",
    priorFractures: "",
    osteoporosis: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.age || !formData.gender) {
      onResult({ type: "error", msg: "⚠️ Please fill in all required fields." });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/predict/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.error) {
        onResult({ type: "error", msg: result.error });
      } else {
        onResult({ type: "success", data: result });
      }
    } catch (error) {
      onResult({ type: "error", msg: "Server error: " + error.message });
    }
  };

  const genderOptions = ["Male", "Female", "Other"];
  const yesNoOptions = ["Yes", "No"];
  const activityOptions = ["Low", "Medium", "High"];

  return (
    <form
      onSubmit={handleManualSubmit}
      className="bg-white shadow-lg rounded-2xl p-6 space-y-6 border border-gray-200"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Text / Number Inputs */}
        {[
          { label: "Name *", name: "name", type: "text" },
          { label: "Age *", name: "age", type: "number" },
          { label: "Height (cm)", name: "height", type: "number" },
          { label: "Weight (kg)", name: "weight", type: "number" },
          { label: "Race/Ethnicity", name: "race", type: "text" },
          { label: "Calcium Intake", name: "calciumIntake", type: "number" },
          { label: "Vitamin D Intake", name: "vitaminDIntake", type: "number" },
          { label: "Medical Conditions", name: "medicalConditions", type: "text" },
          { label: "Medications", name: "medications", type: "text" },
          { label: "Prior Fractures", name: "priorFractures", type: "text" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
            />
          </div>
        ))}

        {/* Dropdowns for categorical fields */}
        {[
          { label: "Gender *", name: "gender", options: genderOptions },
          { label: "Hormonal Changes", name: "hormonalChanges", options: yesNoOptions },
          { label: "Family History", name: "familyHistory", options: yesNoOptions },
          { label: "Physical Activity", name: "physicalActivity", options: activityOptions },
          { label: "Smoking", name: "smoking", options: yesNoOptions },
          { label: "Alcohol Consumption", name: "alcohol", options: yesNoOptions },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {field.label}
            </label>
            <Listbox value={formData[field.name]} onChange={(val) => setFormData({ ...formData, [field.name]: val })}>
              <div className="relative">
                <Listbox.Button className="w-full px-4 py-2 border-2 border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-left">
                  {formData[field.name] || "Select"}
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 w-full bg-white border-2 border-purple-500 rounded-lg shadow-lg z-50">
                  {field.options.map((opt) => (
                    <Listbox.Option
                      key={opt}
                      value={opt}
                      className={({ active }) =>
                        `cursor-pointer px-4 py-2 ${active ? "bg-purple-600 text-white" : "text-gray-800"}`
                      }
                    >
                      {opt}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold shadow-md hover:from-purple-700 hover:to-purple-800 hover:shadow-lg transition"
      >
        Predict
      </button>
    </form>
  );
};

export default ManualForm;