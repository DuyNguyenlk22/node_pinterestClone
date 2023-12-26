import express from "express";
import {
  deleteImgCreated,
  getInfoUser,
  getListImgCreated,
  getListImgSaved,
} from "../controllers/manageController.js";
import { verifyToken } from "../config/jwt.js";

const manageRoute = express.Router();

manageRoute.get("/get-info-user", verifyToken, getInfoUser);
manageRoute.get("/listImg-saved", verifyToken, getListImgSaved);
manageRoute.get("/listImg-created", verifyToken, getListImgCreated);
manageRoute.delete("/delete-img-created", verifyToken, deleteImgCreated);

export default manageRoute;
