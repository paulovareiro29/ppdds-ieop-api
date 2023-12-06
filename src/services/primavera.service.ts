import axios from "axios";
import { PRIMAVERA_API_URL } from "../config";

const get = (endpoint: string, token: string) => {
  return axios
    .get(`${PRIMAVERA_API_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export default { get };
