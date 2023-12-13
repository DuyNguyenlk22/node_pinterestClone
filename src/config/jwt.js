import jwt from "jsonwebtoken";

export const createToken = (data) => {
  let token = jwt.sign(data, "BIMAT", {
    algorithm: "HS256",
    expiresIn: "5m",
  });
  return token;
};

export const checkToken = (token) => {
  return jwt.verify(token, "BIMAT", (error, decoded) => {
    return error;
  });
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};
