import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { RiDownloadLine } from "react-icons/ri";
import "./App.css";

const App = () => {
  const [message, setMessage] = useState<string>("");
  const [document, setDocument] = useState<File | null>(null);
  const [conversionType, setConversionType] = useState<string>("");
  const [convertedData, setConvertedData] = useState<string>("");
  const [lineSeparator, setLineSeparator] = useState<string>("");
  const [elementSeparator, setElementSeparator] = useState<string>("");
  const [downloadLink, setDownloadLink] = useState<string>("");

  useEffect(() => {
    if (document && conversionType) {
      if (
        document.type === conversionType ||
        (document.type === "text/xml" && conversionType === "application/xml")
      )
        setMessage(`This document is already in ${document.type} format!`);
      else {
        setMessage("");
      }
    }
  }, [document, conversionType]);

  // Handle form submission
  const handleSubmit = async () => {
    if (!document) return;

    const formData = new FormData();
    formData.append("input", document);
    formData.append("from", document.type);
    formData.append("to", conversionType);
    formData.append("lineSeparator", lineSeparator);
    formData.append("elementSeparator", elementSeparator);

    try {
      axios
        .post("/convert", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response: AxiosResponse) => {
          const result = decodeHtmlEntities(response.data.result);
          setConvertedData(result);
          const blob = new Blob([result], {
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
      console.error("Error converting document:", error);
    }
  };

  const decodeHtmlEntities = (text: string) => {
    let result = window.document.createElement("textarea");
    result.innerHTML = text;
    return result.value;
  };

  const triggerDownload = () => {
    // Trigger the download using the Blob URL
    const link = window.document.createElement("a");
    link.href = downloadLink;
    link.download = "output";
    link.click();

    URL.revokeObjectURL(downloadLink);
  };

  const requireSeparators =
    (document &&
      (document.type === "text/plain" || conversionType === "text/plain")) ||
    false;

  return (
    <div className="root">
      <div className="upload-container">
        <h1>Document Converter</h1>
        <p>Currently supports conversions between .txt, .json, and .xml</p>

        <div className="document-container">
          <h4>Upload document:</h4>
          <input
            type="file"
            accept="text/plain,application/xml,application/json"
            onChange={(e) => {
              if (e.target.files) {
                setDocument(e.target.files[0]);
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
              !document ||
              (requireSeparators && (!lineSeparator || !elementSeparator))
            }
          >
            Upload and Convert
          </button>
          {/* <button
            className="download-button button"
            onClick={triggerDownload}
            disabled={!downloadLink}
          >
            Download File
          </button> */}
        </div>
      </div>
      <div className="result-container">
        <pre className="result-text">
          {downloadLink && (
            <RiDownloadLine
              size={25}
              className="download-button"
              onClick={triggerDownload}
            />
          )}
          {convertedData}
        </pre>
      </div>
    </div>
  );
};

export default App;
