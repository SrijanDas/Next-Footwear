import axios from "axios";

const environment = process.env.NODE_ENV || "development";

const instance = axios.create({
  baseURL:
    environment === "development"
      ? process.env.NEXT_PUBLIC_DEV_API_URL
      : process.env.NEXT_PUBLIC_API_URL,
});

export default instance;
