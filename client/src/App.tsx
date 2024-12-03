import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [conversionType, setConversionType] = useState<string>("json");
  const [convertedData, setConvertedData] = useState<string>("");
  const [lineSeparator, setLineSeparator] = useState<string>("");
  const [elementSeparator, setElementSeparator] = useState<string>("");

  // Handle form submission
  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("input", file);
    formData.append("from", file.type);
    formData.append("to", conversionType);
    formData.append("lineSeparator", lineSeparator);
    formData.append("elementSeparator", elementSeparator);

    console.log(formData);
    try {
      axios
        .post("/api/convert", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response);
          setConvertedData(response.data.result); // Assuming the response contains the converted data
          // Reset everything here
        });
    } catch (error) {
      console.error("Error converting file:", error);
    }
  };

  return (
    <div className="root">
      <h1>File Conversion</h1>
      {/* File input */}
      <div className="file-container">
        <input
          type="file"
          accept="text/plain,application/xml,application/json"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
          required
        />
        <div>
          <label htmlFor="conversionType">Conversion Type: </label>
          <select
            id="conversionType"
            className="type-dropdown button"
            value={conversionType}
            onChange={(e) => setConversionType(e.target.value)}
          >
            <option value="json">JSON</option>
            <option value="string">String</option>
            <option value="xml">XML</option>
          </select>
        </div>
      </div>

      {/* Additional inputs for separators */}
      {file &&
        (file.type === "text/plain" || conversionType === "text/plain") && (
          <div className="input-container">
            <div>
              <label htmlFor="line-separator">Line Separator:</label>
              <input
                id="line-separator"
                type="text"
                maxLength={1}
                value={lineSeparator}
                onChange={(e) => setLineSeparator(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="element-separator">Element Separator:</label>
              <input
                id="element-separator"
                type="text"
                maxLength={1}
                value={elementSeparator}
                onChange={(e) => setElementSeparator(e.target.value)}
              />
            </div>
          </div>
        )}

      {/* Submit button */}
      <div className="button-container">
        <button
          type="submit"
          className="upload-button button"
          onClick={handleSubmit}
          disabled={!conversionType || !file}
        >
          Upload and Convert
        </button>
      </div>

      {/* Display converted data */}
      {convertedData && <pre>{convertedData}</pre>}

      {/* Display error message */}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default App;
