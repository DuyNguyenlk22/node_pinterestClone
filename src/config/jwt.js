import jwt from "jsonwebtoken";
import { respsonseData } from "./response.js";

// * token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZ3VvaV9kdW5nX2lkIjoyNCwiaWF0IjoxNzAyNTI2NzA3LCJleHAiOjE4NjAzMTQ3MDd9.t6spyvtHnTtYaxB69KUFMONO4eOXg1I4Y0JxmyrXkMA

export const createToken = (data) => {
  let token = jwt.sign(data, "BIMAT", {
    algorithm: "HS256",
    expiresIn: "10m",
  });
  return token;
};

export const checkToken = (token) => {
  return jwt.verify(token, "BIMAT", (error, decoded) => {
    return error;
  });
};

//Refresh token

export const createRefToken = (data) => {
  let token = jwt.sign(data, "PRIVATE", {
    algorithm: "HS256",
    expiresIn: "20d",
  });
  return token;
};

export const checkRefToken = (token) => {
  return jwt.verify(token, "PRIVATE", (error, decoded) => {
    return error;
  });
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};

export const verifyToken = (req, res, next) => {
  let { token } = req.headers;
  let check = checkToken(token);
  if (check == null) {
    next();
  } else {
    respsonseData(res, check.name, "", 401);
  }
};
