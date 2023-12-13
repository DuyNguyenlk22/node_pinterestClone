import express from "express";
import authRoute from "./authRoutes.js";

const rootRoute = express.Router();

rootRoute.use("/auth", authRoute);

export default rootRoute;
