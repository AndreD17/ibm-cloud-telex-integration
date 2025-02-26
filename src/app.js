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
        app_logo: "https://iili.io/GF90sn.jpg",
        app_name: "Cloud spend tracker App",
        app_url: "https://ibm-cloud-telex-integration.onrender.com",
        background_color: "#ffff",
      },
      integration_category: "Cloud Services",
      integration_type: "interval",
      is_active: true,
      output: [],
      key_features: [
        "Gets spending data from IBM CLOUD.",
        "Sends spending data on Telex channel every hour.",
      ],
      author:"Andre",
      settings: [
        {
          label: "https://ibm-cloud-telex-integration.onrender.com/fetch-spending",
          description: "Fetches spendind data from ibm cloud.",
          type: "text",
          required: true,
          default: "{0$} spent on resources", 
        },
        {
          label: "Delivery Time",
          type: "dropdown",
          required: true,
          default: "0 * * * *",
          options: [
            "0 * * * *",
            "5 * * * *",
            "10 * * * *",
            "15 * * * *",
            "20 * * * *",
            "25 * * * *",
            "30 * * * *",
            "35 * * * *",
            "40 * * * *",
            "45 * * * *",
            "50 * * * *",
            "55 * * * *"
          ]
        },
      ],
      tick_url: "https://ibm-cloud-telex-integration.onrender.com/fetch-spending/tick",
      target_url: "https://ibm-cloud-telex-integration.onrender.com" 
    },
  }
