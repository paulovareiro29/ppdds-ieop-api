import axios from "axios";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { CLIENT_KEY, CLIENT_SECRET, PRIMAVERA_AUTH_ENDPOINT } from "../config";

const getToken: RequestHandler = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  const url = PRIMAVERA_AUTH_ENDPOINT;

  const username = CLIENT_KEY!;
  const password = CLIENT_SECRET!;

  try {
    const response = await axios.request({
      url,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "post",
      data: "grant_type=client_credentials",
      auth: {
        username,
        password,
      },
    });

    const { access_token } = response.data;

    res.locals.token = access_token;
    next();
  } catch {
    res.status(500).send("Error: Failed to authenticate on PRIMAVERA API");
  }
};

export default getToken;
