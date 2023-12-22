import express from "express";
import { getImageComments, getImageDetail } from "../controllers/detailController.js";

const detailRoute = express.Router();

detailRoute.use("/get-img-detail/:hinh_id", getImageDetail);
detailRoute.use("/get-img-comment/:hinh_id", getImageComments);

export default detailRoute;
