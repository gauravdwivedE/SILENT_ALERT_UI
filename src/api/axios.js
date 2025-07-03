import axios from "axios";

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
    timeout: 60000,
   
})
export default instance
