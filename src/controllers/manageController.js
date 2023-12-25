// npm install express multer
// npm i compress-images
// npm install pngquant-bin@6.0.1 --save
import { PrismaClient } from "@prisma/client";
import { decodeToken } from "../config/jwt.js";
import { respsonseData } from "../config/response.js";
import { createImg, updateInfo } from "../services/manageServices.js";

const prisma = new PrismaClient();

export const updateInfoUser = async (req, res) => {
  try {
    let { nguoi_dung_id } = decodeToken(req.headers.token);
    nguoi_dung_id = parseInt(nguoi_dung_id);
    let { mat_khau, ho_ten, tuoi } = req.body;

    if (mat_khau === '') { mat_khau = null; }
    if (ho_ten === '') { ho_ten = null; }
    if (tuoi === '' || isNaN(tuoi)) { tuoi = null; }

    let anh_dai_dien
    if (req.file) { anh_dai_dien = req.file.filename; }
    else anh_dai_dien = null;

    const user = {
      mat_khau,
      ho_ten,
      tuoi,
      anh_dai_dien
    };
    const userUpdated = await updateInfo(nguoi_dung_id, user);
    respsonseData(res, "Xử lý thành công", userUpdated, 200);
  } catch {
    respsonseData(res, "Đã có lỗi xảy ra...", "", 500);
  }
}

export const uploadImg = async (req, res) => {
  try {
    let { nguoi_dung_id } = decodeToken(req.headers.token);
    nguoi_dung_id = parseInt(nguoi_dung_id);
    let { ten_hinh, mo_ta } = req.body;
    let duong_dan = "/public/img/newFeed/" + req.file.filename;

    const imgData = { ten_hinh, mo_ta, duong_dan, nguoi_dung_id };

    const imgUploaded = await createImg(imgData);
    respsonseData(res, "Xử lý thành công", imgUploaded, 200);
  } catch {
    respsonseData(res, "Đã có lỗi xảy ra...", "", 500);
  }
}

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


