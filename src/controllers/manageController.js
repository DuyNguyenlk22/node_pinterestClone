import { PrismaClient } from "@prisma/client";
import { decodeToken } from "../config/jwt.js";
import { respsonseData } from "../config/response.js";

const prisma = new PrismaClient();

export const getInfoUser = async (req, res) => {
  try {
    let { token } = req.headers;

    let accessToken = decodeToken(token);
    console.log("😐 ~ getInfoUser ~ accessToken:👉", accessToken);

    let info = await prisma.nguoi_dung.findUnique({
      where: {
        nguoi_dung_id: accessToken.nguoi_dung_id,
      },
      include: {
        hinh_anh: true,
        luu_anh: {
          include: {
            hinh_anh: true,
          },
        },
      },
    });
    if (!info) {
      respsonseData(res, "Người dùng không tồn tại", "", 400);
      return;
    }
    respsonseData(res, "Xử lý thành công", info, 200);
  } catch {
    respsonseData(res, "Đã có lỗi xảy ra...", "", 500);
  }
};

export const getListImgSaved = async (req, res) => {
  try {
    let { token } = req.headers;

    let accessToken = decodeToken(token);

    let data = await prisma.luu_anh.findMany({
      where: {
        nguoi_dung_id: accessToken.nguoi_dung_id,
      },
      include: {
        hinh_anh: true,
      },
    });
    respsonseData(res, "Xử lý thành công", data, 200);
  } catch {
    respsonseData(res, "Đã có lỗi xảy ra...", "", 500);
  }
};

export const getListImgCreated = async (req, res) => {
  try {
    let { token } = req.headers;

    let accessToken = decodeToken(token);
    let data = await prisma.hinh_anh.findMany({
      where: {
        nguoi_dung_id: accessToken.nguoi_dung_id,
      },
    });
    respsonseData(res, "Xử lý thành công", data, 200);
  } catch {
    respsonseData(res, "Đã có lỗi xảy ra...", "", 500);
  }
};

export const deleteImgCreated = async (req, res) => {
  try {
    let { hinh_id } = req.body;

    await prisma.hinh_anh.delete({
      where: {
        hinh_id,
      },
    });

    respsonseData(res, "Xoá ảnh thành công", "", 200);
  } catch {
    respsonseData(res, "Đã có lỗi xảy ra...", "", 500);
  }
};
