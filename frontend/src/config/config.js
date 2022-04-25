const baseApiUrl = "https://txo8iq5dc4.execute-api.eu-central-1.amazonaws.com"

const config = {
  prod: {
    apiEndpoint: baseApiUrl + "/production",
  },
  dev: {
    apiEndpoint: baseApiUrl + "/development"
  },
};

export default config;
