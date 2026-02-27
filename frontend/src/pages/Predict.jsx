import React, { useState } from "react";
import ManualForm from "../components/ManualForm";
import CsvUpload from "../components/CsvUpload";
import Result from "../components/Result"; // make sure path is correct

const Predict = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <div className="w-full max-w-6xl px-6 md:px-12 py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700 text-center mb-8">
          Predict Bone Alignment
        </h1>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`px-6 py-2 border-2 rounded-lg font-semibold transition ${
              activeTab === "manual"
                ? "bg-purple-600 text-white border-purple-600"
                : "border-purple-600 text-purple-600 hover:bg-purple-100"
            }`}
            onClick={() => setActiveTab("manual")}
          >
            Manual Form
          </button>
          <button
            className={`px-6 py-2 border-2 rounded-lg font-semibold transition ${
              activeTab === "csv"
                ? "bg-purple-600 text-white border-purple-600"
                : "border-purple-600 text-purple-600 hover:bg-purple-100"
            }`}
            onClick={() => setActiveTab("csv")}
          >
            Upload CSV
          </button>
        </div>

        {/* Conditional Rendering */}
        <div className="max-w-6xl mx-auto">
          {activeTab === "manual" && <ManualForm onResult={setResult} />}
          {activeTab === "csv" && <CsvUpload onResult={setResult} />}
        </div>

        {/* Result */}
        {result && (
          <>
            {/* small alert */}
            <div
              className={`mt-6 max-w-6xl mx-auto p-4 rounded-lg shadow-md ${
                result.type === "success"
                  ? "bg-purple-100 text-purple-700 border border-purple-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
              role="alert"
            >
              {result.msg}
            </div>

            {/* detailed result */}
            {result.data && <Result output={result.data} />}
          </>
        )}
      </div>
    </div>
  );
};

export default Predict;