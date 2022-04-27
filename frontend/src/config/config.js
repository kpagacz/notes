const baseApiUrl = "" // Here goes the base Api URL of the backend service

const config = {
  prod: {
    apiEndpoint: baseApiUrl + "/production",
  },
  dev: {
    apiEndpoint: baseApiUrl + "/development"
  },
};

export default config;
