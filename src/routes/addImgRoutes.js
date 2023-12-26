import express from "express";
import { uploadNewFeed } from "../config/upload.js";
import { uploadImg } from "../controllers/addImgController.js";

const addImgRoute = express.Router();

addImgRoute.post("/upload-img", uploadNewFeed.single("duong_dan"), uploadImg);

export default addImgRoute;
