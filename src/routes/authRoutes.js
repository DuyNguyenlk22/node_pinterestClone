import express from "express";
import { logOut, login, signUp, tokenRef } from "../controllers/authController.js";

const authRoute = express.Router();

authRoute.post("/login", login);

authRoute.post("/signup", signUp);

authRoute.post("/token-ref", tokenRef);

authRoute.post("/logout", logOut);

export default authRoute;
