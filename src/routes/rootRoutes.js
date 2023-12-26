import express from "express";
import authRoute from "./authRoutes.js";
import homeRoute from "./homeRoutes.js";
import manageRoute from "./manageRoutes.js";
import detailRoute from "./detailRoutes.js";
import addImgRoute from "./addImgRoutes.js";
import personalRoute from "./personalRoutes.js";

const rootRoute = express.Router();

rootRoute.use("", homeRoute);
rootRoute.use("/auth", authRoute);
rootRoute.use("/detail", detailRoute);
rootRoute.use("/manage", manageRoute);
rootRoute.use("/addImg", addImgRoute);
rootRoute.use("/personal", personalRoute);

export default rootRoute;
