import express from "express";
import {
  deleteImgCreated,
  getInfoUser,
  getListImgCreated,
  getListImgSaved,
  postImgAddNew,
} from "../controllers/manageController.js";
import { verifyToken } from "../config/jwt.js";

const manageRoute = express.Router();

manageRoute.get("/get-info-user", verifyToken, getInfoUser);
manageRoute.get("/listImg-saved", verifyToken, getListImgSaved);
manageRoute.get("/listImg-created", verifyToken, getListImgCreated);
manageRoute.delete("/delete-img-created", verifyToken, deleteImgCreated);


manageRoute.post("/img-add-new", verifyToken, postImgAddNew );

export default manageRoute;
