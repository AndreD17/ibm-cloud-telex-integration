import express from "express";
import cors from "cors";
import { telexIntervalIntegration } from "./src/app.js"; 
import { fetchCloudSpending, sendToWebhook } from "./src/IbmCloudSpend.js";


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
    res.send("Cloud spend tracker App");
});

app.get("/telexIntervalIntegration", (req, res) => {
    res.status(202).json(telexIntervalIntegration);
});

// API Endpoint: Manually Trigger Spending Data Fetch
app.get("/fetch-spending", async (req, res) => {
    console.log("📡 Manually fetching IBM Cloud spending data...");
    const spendingData = await fetchCloudSpending();
    await sendToWebhook(spendingData);
    res.status(202).json({ message: "IBM Cloud spending data sent!", data: spendingData });
});


// Schedule the function to run every hour (3600000ms)********
setInterval(fetchCloudSpending, 3600000);

app.post("/send-spending", async (req, res) => {
    try {
        const spendingData = req.body; // Get data from request body

        if (!spendingData || Object.keys(spendingData).length === 0) {
            return res.status(400).json({ error: "Invalid request: No data provided" });
        }

        console.log("📡 Sending spending data to webhook...");
        await sendToWebhook(spendingData);

        res.status(202).json({ message: "Spending data sent to webhook successfully!", data: spendingData });
    } catch (error) {
        console.error("❌ Error processing request:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
