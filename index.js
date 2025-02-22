import express from "express";
import cors from "cors";
import { telexIntervalIntegration } from "./src/app.js"; 
import { fetchCloudSpending, sendToWebhook } from "./src/IbmCloudSpend.js";


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());


app.get("/", (req, res) => {
    res.send("Cloud Spend Monitor")
});

app.get("/telexIntervalIntegration", (req, res) => {
    res.json(telexIntervalIntegration);
})

// API Endpoint: Manually Trigger Spending Data Fetch
app.get("/fetch-spending", async (req, res) => {
    console.log("📡 Manually fetching IBM Cloud spending data...");
    const spendingData = await fetchCloudSpending();
    await sendToWebhook(spendingData);
    res.json({ message: "IBM Cloud spending data sent!", data: spendingData });
});


// Schedule the function to run every hour (3600000ms)
setInterval(fetchCloudSpending, 3600000);

app.post("/send-spending", async (req, res) => {
    try {
        const spendingData = req.body; // Get data from request body

        if (!spendingData || Object.keys(spendingData).length === 0) {
            return res.status(400).json({ error: "Invalid request: No data provided" });
        }

        console.log("📡 Sending spending data to webhook...");
        await sendToWebhook(spendingData);

        res.json({ message: "Spending data sent to webhook successfully!", data: spendingData });
    } catch (error) {
        console.error("❌ Error processing request:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Telex tick endpoint
app.post("/tick", async (req, res) => {
  try {
    console.log("Tick request received:", req.body);

    const { return_url } = req.body;
     "https://ping.telex.im/v1/webhooks/01952571-a058-734b-9d5d-9db4b2df5438";

    if (!return_url) {
      return res.status(400).json({ error: "Missingreturn_url" });
    }

    // Fetch and send fixtures to Telex
    await processAndSendData(return_url);

    res.status(200).json({ message: "Fixtures sent successfully" });
  } catch (error) {
    console.error("Error processing tick:", error);
    res.status(500).json({ error: "Failed to process tick" });
  }
});


//send data to tick endpoint 
app.post("/tick", async (req, res) => {
    try {
      console.log("⏳ Tick request received:", req.body);
  
      const { return_url } = req.body;
  
      if (!return_url) {
        return res.status(400).json({ error: "Missing return_url" });
      }
  
      const spendingData = await fetchCloudSpending();
  
      if (!spendingData) {
        return res.status(500).json({ error: "Failed to fetch spending data" });
      }
  
      await sendToWebhook(spendingData);
  
      res.status(200).json({ message: "Spending sent successfully!" });
    } catch (error) {
      console.error("❌ Error processing tick:", error.message);
      res.status(500).json({ error: "Failed to process tick" });
    }
  });
  

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
