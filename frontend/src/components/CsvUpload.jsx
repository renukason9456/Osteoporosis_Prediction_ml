import React, { useState, useRef } from "react";

const CsvUpload = ({ onResult }) => {
  const [csvFile, setCsvFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleCsvUpload = async (e) => {
    e.preventDefault();

    if (!csvFile) {
      onResult({ type: "error", msg: "⚠️ Please select a CSV file." });
      return;
    }

    const formData = new FormData();
    formData.append("file", csvFile);

    try {
      const response = await fetch("http://localhost:5000/api/predict/csv", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let errorMsg = "Server error";
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } else {
          const text = await response.text();
          errorMsg = text;
        }
        onResult({ type: "error", msg: errorMsg });
        setCsvFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      // Success: download CSV
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "prediction_results.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();

      onResult({ type: "success", msg: "✅ CSV processed successfully." });

      // Clear input after success
      setCsvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      onResult({ type: "error", msg: "Server error: " + error.message });
      setCsvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <form
      onSubmit={handleCsvUpload}
      className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 space-y-4"
    >
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="w-full px-4 py-2 border-2 border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
      />
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold shadow-md hover:from-purple-700 hover:to-purple-800 hover:shadow-lg transition"
      >
        Upload & Predict CSV
      </button>
    </form>
  );
};

export default CsvUpload;
