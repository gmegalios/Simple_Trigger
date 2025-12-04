import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const uploadPdf = async () => {
    if (!file) {
      setStatus("Please select a PDF first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setStatus("Uploading...");

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      setStatus(JSON.stringify(data, null, 2));

    } catch (err) {
      setStatus("Error uploading file");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload PDF to Power Automate</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={uploadPdf} style={{ marginLeft: 10 }}>
        Upload
      </button>

      <pre style={{ marginTop: 20 }}>{status}</pre>
    </div>
  );
}

export default App;
