export const telexIntervalIntegration = (req, res) => {
  const data = {
    date: {
      created_at: "2025-02-18",
      updated_at: "2025-02-21",
    },
    integration_category: "Cloud Services",
    integration_type: "Interval Integration",
    descriptions: {
      app_description: "This is a time interval integration whose function is to send spend data on an IBM Cloud account to a Telex channel.",
      app_logo: "https://iili.io/GF90sn.jpg", 
      app_name: "Cloud Spend Tracker App",
      app_url: "https://ibm-cloud-telex-integration.onrender.com/fetch-spending",
      background_color: "#808080",
    },
    is_active: true,
    output: [],
    key_features: [
      "Gets spending data from IBM CLOUD.",
      "Sends spending data on Telex channel every hour.",
    ],
    settings: [
      {
        label: "interval",
        type: "text",
        required: true,
        default: "0 * * * *",
      }
    ],
    tick_url: "https://ibm-cloud-telex-integration.onrender.com/fetch-spending/tick",
    website: "https://ibm-cloud-telex-integration.onrender.com/fetch-spending",
    target_url: ""
  };

  return res.json(data);
};
