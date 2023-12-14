import express from "express";
import { getAllImg, searchImgByName } from "../controllers/homeController.js";

const homeRoute = express.Router();

homeRoute.use("/get-all-img", getAllImg);
homeRoute.use("/search-img/:imgName", searchImgByName);

export default homeRoute;
