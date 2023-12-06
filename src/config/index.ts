import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const CLIENT_KEY = process.env.CLIENT_KEY;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;

export const PRIMAVERA_AUTH_ENDPOINT =
  "https://identity.primaverabss.com/connect/token";
export const PRIMAVERA_API_URL =
  "https://my.jasminsoftware.com/api/311911/311911-0001";
