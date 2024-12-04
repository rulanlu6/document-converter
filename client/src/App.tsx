import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [conversionType, setConversionType] = useState<string>("");
  const [convertedData, setConvertedData] = useState<string>("");
  const [lineSeparator, setLineSeparator] = useState<string>("");
  const [elementSeparator, setElementSeparator] = useState<string>("");
  const [downloadLink, setDownloadLink] = useState<string>("");

  useEffect(() => {
    if (file && conversionType) {
      if (
        file.type === conversionType ||
        (file.type === "text/xml" && conversionType === "application/xml")
      )
        setMessage(`This file is already in ${file.type} format!`);
      else {
        setMessage("");
      }
    }
  }, [file, conversionType]);

  // Handle form submission
  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("input", file);
    formData.append("from", file.type);
    formData.append("to", conversionType);
    formData.append("lineSeparator", lineSeparator);
    formData.append("elementSeparator", elementSeparator);

    try {
      axios
        .post("/convert", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log("response", response);
          setConvertedData(response.data.result); // Assuming the response contains the converted data
          const blob = new Blob([response.data.result], {
            type: conversionType,
          });

          const url = URL.createObjectURL(blob);
          setDownloadLink(url);

          // Reset selections
          setConversionType("");
          setLineSeparator("");
          setElementSeparator("");
        });
    } catch (error) {
      console.error("Error converting file:", error);
    }
  };

  const triggerDownload = () => {
    // Trigger the download using the Blob URL
    const link = document.createElement("a");
    link.href = downloadLink;
    link.download = "output";
    link.click();

    URL.revokeObjectURL(downloadLink);
  };

  const requireSeparators =
    (file && (file.type === "text/plain" || conversionType === "text/plain")) ||
    false;

  return (
    <div className="root">
      <div className="upload-container">
        <h1>File Conversion</h1>
        <p>Currently supports conversions between .txt, .json, and .xml</p>

        <div className="file-container">
          <h4>Upload file:</h4>
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
            <h4>Conversion type:</h4>
            <select
              id="conversionType"
              className="type-dropdown button"
              value={conversionType}
              onChange={(e) => setConversionType(e.target.value)}
            >
              <option value="" disabled>
                Select a format
              </option>
              <option value="application/json">JSON</option>
              <option value="text/plain">String</option>
              <option value="application/xml">XML</option>
            </select>
          </div>
          {message && <div className="message">{message}</div>}
        </div>

        <div
          className={`input-container ${!requireSeparators ? "disabled" : ""}`}
        >
          <h4>Separator characters (for strings only):</h4>
          <div className="separator-container">
            <div>
              <label>Line separator:</label>
              <input
                id="line-separator"
                type="text"
                maxLength={1}
                value={lineSeparator}
                onChange={(e) => setLineSeparator(e.target.value)}
              />
            </div>
            <div>
              <label>Element separator:</label>
              <input
                id="element-separator"
                type="text"
                maxLength={1}
                value={elementSeparator}
                onChange={(e) => setElementSeparator(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="button-container">
          <button
            type="submit"
            className="upload-button button"
            onClick={handleSubmit}
            disabled={
              !conversionType ||
              !file ||
              (requireSeparators && (!lineSeparator || !elementSeparator))
            }
          >
            Upload and Convert
          </button>
          <button
            className="download-button button"
            onClick={triggerDownload}
            disabled={!downloadLink}
          >
            Download File
          </button>
        </div>
      </div>
      <div className="result-container">
        <pre className="result-text">{convertedData}</pre>
      </div>
    </div>
  );
};

export default App;
