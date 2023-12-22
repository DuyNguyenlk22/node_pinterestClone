// npm install express multer
// npm i compress-images

import { PrismaClient } from "@prisma/client";
import { decodeToken } from "../config/jwt.js";
import { respsonseData } from "../config/response.js";

const prisma = new PrismaClient();

export const getInfoUser = async (req, res) => {
  try {
    let { token } = req.headers;

    let accessToken = decodeToken(token);

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

export const postImgAddNew = async (req, res) => {
  try {
    let { token } = req.headers;
    let accessToken = decodeToken(token);
    let { nguoi_dung_id } = accessToken;
    nguoi_dung_id = parseInt(nguoi_dung_id);
    let { ten_hinh, duong_dan, mo_ta } = req.file;
    let imgInfo = {
      ten_hinh,
      duong_dan,
      mo_ta,
      nguoi_dung_id
    };

    // Save the image info to the database
    const savedImgInfo = await prisma.hinh_anh.create({
      data: imgInfo,
    });

    respsonseData(res, "Xử lý thành công", savedImgInfo, 200);
  } catch {
    respsonseData(res, "Đã có lỗi xảy ra...", nguoi_dung_id, 500);
  }
};
