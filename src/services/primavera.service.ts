import axios from "axios";
import { PRIMAVERA_API_URL } from "../config";

const get = async (endpoint: string, token: string) => {
  return axios
    .get(`${PRIMAVERA_API_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

const post = async (endpoint: string, body: any, token: string) => {
  return axios
    .post(`${PRIMAVERA_API_URL}${endpoint}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export default { get, post };
