import express from "express";
import authRoute from "./authRoutes.js";
import homeRoute from "./homeRoutes.js";
import manageRoute from "./manageRoutes.js";
import detailRoute from "./detailRoutes.js";

const rootRoute = express.Router();

rootRoute.use("", homeRoute);
rootRoute.use("/auth", authRoute);
rootRoute.use("/detail", detailRoute);
rootRoute.use("/manage", manageRoute);

// app.use('/images', imageController)
export default rootRoute;
