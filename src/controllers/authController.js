import { PrismaClient } from "@prisma/client";
import bcrypt, { hashSync } from "bcrypt";
import { respsonseData } from "../config/response.js";
import { createToken } from "../config/jwt.js";

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
        let token = createToken({ nguoi_dung_id: checkUser.nguoi_dung_id });
        respsonseData(res, "Login thành công", token, 200);
      } else {
        respsonseData(res, "Mật khẩu không đúng", "", 400);
      }
    } else {
      respsonseData(res, "Email không đúng", "", 400);
    }
  } catch {
    respsonseData(res, "Đã có lỗi xảy ra...", "", 500);
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
    console.log("😐 ~ signUp ~ checkUser:👉", checkUser);

    if (checkUser) {
      respsonseData(res, "Email đã tồn tại", "", 400);
      return;
    }

    let newData = {
      email,
      mat_khau: bcrypt.hashSync(mat_khau, 10),
      ho_ten,
      tuoi,
      anh_dai_dien: "",
    };

    await prisma.nguoi_dung.create({ data: newData });
    respsonseData(res, "Đăng ký thành công", "", 200);
  } catch {
    respsonseData(res, "Đã có lỗi xảy ra...", "", 500);
  }
};
