export const telexIntervalIntegration = {
    data: {
      date: {
        created_at: "2025-02-18",
        updated_at: "2025-02-21",
      },
      integration_category: "Cloud Services",
      integration_type: "Interval Integration",
      descriptions: {
        app_description: "This is a time interval integration whose function is to send spend data on an IBM Cloud account to a telex channel.",
        app_logo: "https://iili.io/GF90sn.jpg.",
        app_name: "Cloud spend tracker App",
        app_url: "https://ibm-cloud-telex-integration.onrender.com/fetch-spending",
        background_color: "#808080",
      },
      integration_category: "Cloud Services",
      integration_type: "interval",
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
          default: "0 * * * *"
        },
        {
          label: "https://ibm-cloud-telex-integration.onrender.com/fetch-spending",
          description: "Fetches spedind data from ibm cloud.",
          type: "text",
          required: true,
          default: "{0$} spent on resources", 
        },
      ],
      tick_url: "https://ping.telex.im/v1/webhooks/01951581-3170-7f1d-be85-16ad2c0d6d2f",
      target_url: "https://ibm-cloud-telex-integration.onrender.com/fetch-spending" 
    },
  };

