# IBM Cloud Spending Monitor API

## 📌 Overview
The **IBM Cloud Spending Monitor API** fetches spending data from IBM Cloud's Usage Reports API for a specific period of time  and sends it to a telex channel every hour interval. This integration helps track cloud spending over time.

## 🚀 Features
- Retrieves IBM Cloud usage data from 
- Fetches spending data for each **billing month (YYYY-MM format)**.
- Sends the data to a telex channel **webhook** to update user.
- Uses **Express.js** as the backend framework.
- Uses **Axios** for making HTTP requests.
- Supports **environment variables** for secure API authentication.

---

## 🛠️ Installation

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/AndreD17/ibm-cloud-spend-monitor.git
cd ibm-cloud-spend-monitor
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Create a `.env` File**
```sh
touch .env
```
Add the following environment variables:
```env
PORT=3000
IBM_ACCOUNT_ID=your_ibm_account_id
IBM_IAM_TOKEN=your_iam_token
WEBHOOK_URL=https://your-webhook-url.com
```

> **Note:** Replace `your_ibm_account_id`, `your_iam_token`, and `your-webhook-url.com` with your actual values.

### **4️⃣ Run the Server**
```sh
node index.js
```

---

## 📡 API Endpoints
### **Fetch & Send IBM Cloud Spending Data**
#### **GET `/Fetch-spending`**
#### **POST `/send-spending`**
Fetches spending data for a stipulated time e.g a month and sends it to a specific telex channel using the **webhook** url provided.

📌 **Example Request:**
```sh
curl -X POST http://localhost:3000/send-spending
```

📌 **Example Response:**
```json
{
  "message": "Spending data sent to webhook successfully!"
}
```

---

## 🛠️ Technologies Used
- **Node.js** - JavaScript runtime
- **Express.js** - Backend framework
- **Axios** - HTTP requests
- **Dotenv** - Environment variable management

---
## 🛠️ Test
- **GET**  http://localhost:3000/fetch-spending
- **POST**  http://localhost:3000/send-spending

--- To test url's copy and paste this links to your browser, check test channel@andreub for update or any webhook channel you add for spending details.

- **GET** https://ibm-cloud-telex-integration.onrender.com/telexIntervalIntegration
- **GET** https://ibm-cloud-telex-integration.onrender.com/fetch-spending

---

## Screenshot

![IBM Cloud Spending Integration]![alt text]

![alt text](<Screenshot (122).png>)
![alt text](<Screenshot (125).png>)


## 🚀 Hosting on Render
You can deploy this API on **Render** with the following steps:

### **1️⃣ Create a Render Account**
Sign up at [Render](https://render.com/) if you haven’t already.

### **2️⃣ Create a New Web Service**
1. Go to **Render Dashboard**.
2. Click on **New +** → **Web Service**.
3. Connect your GitHub repository or upload your project manually.
4. Select **Node.js** as the environment.
5. Set the **Build Command**:
   ```sh
   npm install
   ```
6. Set the **Start Command**:
   ```sh
   node index.js
   ```
7. Add the necessary **environment variables** in the Render dashboard.
8. Click **Deploy**.

### **3️⃣ Monitor Deployment**
- Once deployed, Render will provide a **public URL**.
- Use this URL to send requests to your API.
```  


## 📜 License
This project is licensed under the **MIT License**.

---

## 👨‍💻 Author
**LAWAL DAMILARE** – [GitHub](https://github.com/AndreD17) | 

Feel free to contribute, raise issues, or suggest improvements! 😊



