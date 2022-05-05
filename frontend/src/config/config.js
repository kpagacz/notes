const baseApiUrl = "https://3c3cwwoylb.execute-api.eu-central-1.amazonaws.com" // Here goes the base Api URL of the backend service

const config = {
  prod: {
    apiEndpoint: baseApiUrl + "/production",
  },
  dev: {
    apiEndpoint: baseApiUrl + "/development"
  },
};

export default config;
