const express = require("express");
const multer = require("multer");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());


const upload = multer({ storage: multer.memoryStorage() });


const POWER_AUTOMATE_URL = "https://default7c2caa9144954c729f841d457ad1fa.9b.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/0e55991d561a48e38662e6d4d23aa25a/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=mmHD03HLBoW8ms49x2u6Y6Ke0A28V3DcFAamxY97bIQ";

app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const fileBase64 = req.file.buffer.toString("base64");

        const response = await axios.post(
            POWER_AUTOMATE_URL,
            { fileContent: fileBase64 }, 
            { headers: { "Content-Type": "application/json" } }
        );

        res.json({
            message: "Uploaded and sent to Power Automate",
            flowResponse: response.data
        });

    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: "Failed to trigger Power Automate flow" });
    }
});


app.listen(5000, () => console.log("Server running on http://localhost:5000"));
