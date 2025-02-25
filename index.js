import express from "express";
import cors from "cors";
import { telexIntervalIntegration } from "./src/app.js"; 
import { fetchCloudSpending, sendToWebhook } from "./src/IbmCloudSpend.js";


const app = express();
const port = process.env.PORT || 3000;

// CORS Configuration
const allowedOrigins = [
    "https://telex.im",
    "https://telextest.im",
    "https://staging.telextest.im"
];

// Custom CORS middleware
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.some(allowed => origin.startsWith(allowed))) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.get("/", (req, res) => {
    res.status(200).json({ message: "IBM Cloud Spend Tracking API is running" });
});

app.get("/telexIntervalIntegration", (req, res) => {
    res.status(202).json(telexIntervalIntegration);
});

// API Endpoint: Manually Trigger Spending Data Fetch
app.get("/fetch-spending", async (req, res) => {
    console.log("📡 Manually fetching IBM Cloud spending data...");
    const spendingData = await fetchCloudSpending();
    await sendToWebhook(spendingData);
    res.status(202).json({ message: "0$ spent on IBM cloud resources!", data: spendingData });
});


// Schedule the function to run every min (60000ms)********
setInterval(async () => {
    console.log("⏳ Automatically fetching IBM Cloud spending data...");
    const spendingData = await fetchCloudSpending();
    await sendToWebhook(spendingData);
}, 3600000);

app.post("/send-spending", async (req, res) => {
    try {
        const spendingData = req.body; // Get data from request body
        if (!spendingData || Object.keys(spendingData).length === 0) {
            return res.status(400).json({ error: "Invalid request: No data provided" });
        }

        console.log("📡 Sending spending data to webhook...");
        await sendToWebhook(spendingData);
        res.status(202).json({ data: spendingData, message: "Spending data sent to webhook successfully!" });
    } catch (error) {
        console.error("❌ Error processing request:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
