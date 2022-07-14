import axios from "axios";

// const environment = env.NODE_ENV || "development";
const environment = "development";

const instance = axios.create({
  baseURL:
    environment === "development"
      ? process.env.NEXT_PUBLIC_DEV_API_URL
      : process.env.API_URL,
});

export default instance;
