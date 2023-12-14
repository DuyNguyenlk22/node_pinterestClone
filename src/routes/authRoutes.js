import express from "express";
import { login, signUp, tokenRef } from "../controllers/authController.js";

const authRoute = express.Router();

authRoute.post("/login", login);

authRoute.post("/signup", signUp);

authRoute.post("token-ref", tokenRef);

export default authRoute;
