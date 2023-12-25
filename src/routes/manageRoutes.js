import express from "express";
import {
  deleteImgCreated,
  getInfoUser,
  getListImgCreated,
  getListImgSaved,
  updateInfoUser,
  uploadImg,
} from "../controllers/manageController.js";
import { verifyToken } from "../config/jwt.js";
import { uploadAvatar, uploadNewFeed } from "../config/upload.js";

const manageRoute = express.Router();

manageRoute.get("/get-info-user", verifyToken, getInfoUser);
manageRoute.get("/listImg-saved", verifyToken, getListImgSaved);
manageRoute.get("/listImg-created", verifyToken, getListImgCreated);
manageRoute.delete("/delete-img-created", verifyToken, deleteImgCreated);


manageRoute.put("/update-user-info", uploadAvatar.single("anh_dai_dien"), updateInfoUser);
manageRoute.post("/upload-img", uploadNewFeed.single("duong_dan"), uploadImg);

export default manageRoute;
