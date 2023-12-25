import express from "express";
import { getImageComments, getImageDetail} from "../controllers/detailController.js";

const detailRoute = express.Router();

detailRoute.get("/get-img-detail/:hinh_id", getImageDetail);
detailRoute.get("/get-img-comment/:hinh_id", getImageComments);


export default detailRoute;
