import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { respsonseData } from "../config/response.js";
import {
  checkRefToken,
  checkToken,
  createRefToken,
  createToken,
  decodeToken,
} from "../config/jwt.js";

const prisma = new PrismaClient();

export const login = async (req, res) => {
  try {
    let { email, mat_khau } = req.body;

    let checkUser = await prisma.nguoi_dung.findFirst({
      where: {
        email: email,
      },
    });
    if (checkUser) {
      if (bcrypt.compareSync(mat_khau, checkUser.mat_khau)) {
        let key = Date.now();
        let token = createToken({
          nguoi_dung_id: checkUser.nguoi_dung_id,
          key
        });

        let refToken = createRefToken({
          nguoi_dung_id: checkUser.nguoi_dung_id,
          key
        });

        await prisma.nguoi_dung.update({
          where: {
            nguoi_dung_id: checkUser.nguoi_dung_id,
          },
          data: {
            ...checkUser,
            refresh_token: refToken,
          },
        });

        let dataUser = {
          email: email,
          ho_ten: checkUser.ho_ten,
          tuoi: checkUser.tuoi,
          anh_dai_dien: checkUser.anh_dai_dien,
          accessToken: token,
        };
        respsonseData(res, "Login successfully", dataUser, 200);
      } else {
        respsonseData(res, "Wrong password", "", 400);
      }
    } else {
      respsonseData(res, "Wrong or not existed email adress", "", 400);
    }
  } catch {
    respsonseData(res, "Unexpected Error", "", 500);
  }
};

export const signUp = async (req, res) => {
  try {
    let { email, mat_khau, ho_ten, tuoi } = req.body;

    let checkUser = await prisma.nguoi_dung.findFirst({
      where: {
        email: email,
      },
    });

    if (checkUser) {
      respsonseData(res, "Email had been selected, please try another email", "", 400);
      return;
    }
    if (email === "") {
      respsonseData(res, "Error...", "", 500)
      return
    } else {
      if (mat_khau === "") {
        respsonseData(res, "Error...", "", 500)
        return 
      }
    }
    if (tuoi <= 0 || tuoi === "") tuoi = null 
    if (ho_ten === "") ho_ten = null 
    
    let newData = {
      email,
      mat_khau: bcrypt.hashSync(mat_khau, 10),
      ho_ten,
      tuoi,
      anh_dai_dien: "",
    };

    await prisma.nguoi_dung.create({ data: newData });
    respsonseData(res, "Sign Up successfully", "", 200);
  } catch {
    respsonseData(res, "Unexpected Error", "", 500);
  }
};

export const tokenRef = async (req, res) => {
  try {
    let { token } = req.headers;

    //Check token
    let check = checkToken(token);
    if (check != null && check.name !== "TokenExpiredError") {
      res.status(401).send(check.name);
      return;
    }

    let accessToken = decodeToken(token);
    let getUser = await prisma.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id: accessToken.nguoi_dung_id,
      },
    });

    //check Ref Token
    let checkRef = checkRefToken(getUser.refresh_token);
    if (checkRef != null) {
      res.status(401).send(check.name);
      return;
    }

    //check code
    let refToken = decodeToken(getUser.refresh_token);
    if (accessToken.key != refToken.key) {
      res.status(401).send(check.name);
      return;
    }

    let newToken = createToken({
      nguoi_dung_id: getUser.nguoi_dung_id,
      key: refToken.key,
    });

    respsonseData(res, "", newToken, 200);
  } catch {
    respsonseData(res, "Unexpected Error", "", 500);
  }
};

export const logOut = async (req, res) => {
  try {
    let { token } = req.headers;
    let accessToken = decodeToken(token);
    let getUser = await prisma.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id: accessToken.nguoi_dung_id,
      },
    });

    await prisma.nguoi_dung.update({
      where: {
        nguoi_dung_id: getUser.nguoi_dung_id,
      },
      data: {
        ...getUser,
        refresh_token: "",
      },
    });

    respsonseData(res, "", "", 200);
  } catch {
    respsonseData(res, "Unexpected Error", "", 500);
  }
};
