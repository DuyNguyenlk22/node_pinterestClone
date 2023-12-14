import express from "express";
import authRoute from "./authRoutes.js";
import homeRoute from "./homeRoutes.js";
import manageRoute from "./manageRoutes.js";

const rootRoute = express.Router();

rootRoute.use("/auth", authRoute);
rootRoute.use("", homeRoute);
rootRoute.use("/manage", manageRoute);

export default rootRoute;
