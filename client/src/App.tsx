import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [conversionType, setConversionType] = useState<string>("json");
  const [convertedData, setConvertedData] = useState<string>("");

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  // Handle file conversion
  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("input", file);
    formData.append("from", file.type);
    formData.append("to", conversionType); // Send the desired file type (json, string, xml)

    try {
      axios
        .post("/api/convert", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response);
          setConvertedData(response.data.result); // Assuming the response contains the converted data
        });
    } catch (error) {
      console.error("Error converting file:", error);
    }
  };

  return (
    <div>
      <h1>File Upload and Conversion</h1>

      {/* File upload */}
      <input
        type="file"
        name="input"
        accept="text/plain,application/xml,application/json"
        onChange={handleFileChange}
      />

      {/* File type selection */}
      <select
        value={conversionType}
        onChange={(e) => setConversionType(e.target.value)}
      >
        <option value="json">JSON</option>
        <option value="string">String</option>
        <option value="xml">XML</option>
      </select>

      {/* Upload button */}
      <button onClick={handleFileUpload}>Upload and Convert</button>

      {/* Display converted data */}
      {convertedData && <pre>{convertedData}</pre>}
      <div>{message}</div>
    </div>
  );
};

export default App;
