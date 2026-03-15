import React, { useState } from "react";
import ManualForm from "../components/ManualForm";
import CsvUpload from "../components/CsvUpload";
import Result from "../components/Result";

const Predict = () => {

  const [activeTab, setActiveTab] = useState("");
  const [result, setResult] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setResult(null); // reset result when switching input type
  };

  const resetPrediction = () => {
    setResult(null);
    setActiveTab("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex flex-col items-center">

      <div className="w-full max-w-6xl px-6 md:px-12 py-12">

        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700 text-center mb-3">
          Osteoporosis Risk Prediction
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
          This machine learning system predicts the risk of Osteoporosis using
          patient health factors such as age, gender, calcium intake, physical
          activity, medical history, and lifestyle habits.
        </p>

        {/* Info Card */}
        <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg mb-10 text-center">
          <p className="text-purple-700 text-sm">
            ℹ️ Osteoporosis is a condition where bones become weak and brittle.
            Early prediction helps reduce fracture risk and improve bone health.
          </p>
        </div>

        {/* Input Selection */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">

          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Choose Input Method
          </h2>

          <div className="flex justify-center flex-wrap gap-4">

            <button
              className={`px-6 py-3 border-2 rounded-lg font-semibold transition ${
                activeTab === "manual"
                  ? "bg-purple-600 text-white border-purple-600"
                  : "border-purple-600 text-purple-600 hover:bg-purple-100"
              }`}
              onClick={() => handleTabChange("manual")}
            >
              📝 Manual Form
            </button>

            <button
              className={`px-6 py-3 border-2 rounded-lg font-semibold transition ${
                activeTab === "csv"
                  ? "bg-purple-600 text-white border-purple-600"
                  : "border-purple-600 text-purple-600 hover:bg-purple-100"
              }`}
              onClick={() => handleTabChange("csv")}
            >
              📂 Upload CSV
            </button>

          </div>
        </div>

        {/* Forms Section */}
        <div className="max-w-6xl mx-auto">

          {!activeTab && (
            <div className="text-center text-gray-500 bg-gray-50 p-8 rounded-lg shadow-sm">
              Please select an input method to start prediction.
            </div>
          )}

          {activeTab === "manual" && (
            <ManualForm onResult={setResult} />
          )}

          {activeTab === "csv" && (
            <CsvUpload onResult={setResult} />
          )}

        </div>

        {/* Result Section */}
        {result && (
          <div className="mt-10 max-w-6xl mx-auto">

            {/* Alert Message */}
            <div
              className={`p-4 rounded-lg shadow-md mb-6 ${
                result.type === "success"
                  ? "bg-purple-100 text-purple-700 border border-purple-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {result.msg}
            </div>

            {/* Detailed Prediction Result */}
            {result.data && (
              <div className="bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-xl font-semibold text-purple-700 mb-4">
                  Prediction Result
                </h2>

                <Result output={result.data} />
              </div>
            )}

            {/* Reset Button */}
            <div className="text-center mt-6">
              <button
                onClick={resetPrediction}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium"
              >
                🔄 New Prediction
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default Predict;