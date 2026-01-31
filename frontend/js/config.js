// Configuration file - Update API_URL for deployment
const CONFIG = {
  // Toggle: Set to true for production, false for local development
  IS_PRODUCTION: true,

  // URLs
  LOCAL_URL: "http://localhost:5000/api/tasks",
  PRODUCTION_URL:
    "https://taskmanager-production-989c.up.railway.app/api/tasks",
};

// Set API_URL based on environment
CONFIG.API_URL = CONFIG.IS_PRODUCTION
  ? CONFIG.PRODUCTION_URL
  : CONFIG.LOCAL_URL;
