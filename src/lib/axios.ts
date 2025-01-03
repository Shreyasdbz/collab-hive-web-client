import axios from "axios";

// Configure Axios globally with the base URL from environment variables
const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_COLLAB_HIVE_API_BASE_URL}/${process.env.NEXT_PUBLIC_COLLAB_HIVE_API_VERSION}`,
});

export default axiosClient;
