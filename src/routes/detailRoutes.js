import express from "express";
import { addComment, getImageComments, getImageDetail, getImageIsSaved } from "../controllers/detailController.js";
import { uploadComment } from "../config/upload.js";

const detailRoute = express.Router();

detailRoute.get("/get-img-detail/:hinh_id", getImageDetail);
detailRoute.get("/get-img-comment/:hinh_id", getImageComments);
detailRoute.get("/get-img-is-saved/:hinh_id", getImageIsSaved);

detailRoute.post("/add-comment", uploadComment.single("anh_dinh_kem"), addComment);

export default detailRoute;
