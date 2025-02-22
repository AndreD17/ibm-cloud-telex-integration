import express from "express";
import cron from "node-cron";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();


const app = express();

// Middleware
app.use(express.json());

// IBM Cloud API & Webhook URLs 
const IBM_CLOUD_ACCOUNT_ID = process.env.IBM_CLOUD_ACCOUNT_ID;
const IBM_CLOUD_API_KEY = process.env.IBM_CLOUD_API_KEY;
const WEBHOOK_URL = "https://ping.telex.im/v1/webhooks/01951581-3170-7f1d-be85-16ad2c0d6d2f";

// Token Variables
let authToken = null;
let tokenExpiration = 0;

// Function to get a new IBM Cloud IAM token
async function getAuthToken() {
    try {
        const response = await axios.post(
            'https://iam.cloud.ibm.com/identity/token',
            new URLSearchParams({
                grant_type: 'urn:ibm:params:oauth:grant-type:apikey',
                apikey: IBM_CLOUD_API_KEY
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        authToken = response.data.access_token;
        tokenExpiration = Date.now() + response.data.expires_in * 1000; // Convert to milliseconds
        console.log('🔐 New IBM Cloud token obtained');

    } catch (error) {
        console.error('❌ Authentication failed:', error.response?.data || error.message);
    }
}

// Function to ensure a valid token before making API calls
async function ensureValidToken() {
    if (!authToken || Date.now() >= tokenExpiration - 60000) { // Refresh 1 min before expiration
        await getAuthToken();
    }
    return authToken;
}

// Fetch IBM Cloud Spending
export const fetchCloudSpending = async () => {
    try {
        const billingMonth = "2024-02"; // Example: February 2024 (YYYY-MM format)
        const token = await ensureValidToken(); // Ensure valid IAM token

        const response = await axios.get(
            `https://billing.cloud.ibm.com/v4/accounts/${IBM_CLOUD_ACCOUNT_ID}/usage/${billingMonth}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Use IAM token, not API key
                    Accept: "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("❌ Error fetching IBM Cloud spending data:", error.response?.data || error.message);
        return null;
    }
};

// Send Spending Data to Webhook
export const sendToWebhook = async (spendingData) => {
    if (!spendingData) return;

    const payload = {
        message: "IBM Cloud Spending Update",
        username: "Cloud Spending Monitor",
        event_name: "Cloud Spending Check",
        status: "success",
        summary: spendingData.summary || "No summary available",
    };

    try {
        await axios.post(WEBHOOK_URL, payload, {
            headers: { "Content-Type": "application/json" }
        });
        console.log("✅ Spending data sent to webhook");
    } catch (error) {
        console.error("❌ Failed to send data to webhook:", error.response?.data || error.message);
    }
};

// Scheduled Job: Runs every hour
cron.schedule("0 * * * *", async () => {
    console.log("⏳ Fetching IBM Cloud spending data...");
    require("dotenv").config();
    const spendingData = await fetchCloudSpending();
    await sendToWebhook(spendingData);
});

