// npm install express multer
// npm i compress-images

import { PrismaClient } from "@prisma/client";
import { decodeToken } from "../config/jwt.js";
import { respsonseData } from "../config/response.js";
import { createImg, updateInfo } from "../services/manageServices.js";
import fs from 'fs'
import compress_images from 'compress-images';
const prisma = new PrismaClient();

export const updateInfoUser = async (req, res) => {
  try {
    let { nguoi_dung_id } = decodeToken(req.headers.token);
    nguoi_dung_id = parseInt(nguoi_dung_id);
    let { mat_khau, ho_ten, tuoi } = req.body;

    let anh_dai_dien
    compress_images(
      process.cwd() + "/public/inputImg/avatar/" + req.file.filename,
      process.cwd() + "/public/img/avatar/",
      { compress_force: false, statistic: true, autoupdate: true }, false,
      { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
      { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
      { svg: { engine: "svgo", command: "--multipass" } },
      { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
      function (error, completed) {
        if (completed) {
          fs.unlinkSync(process.cwd() + "/public/inputImg/avatar/" + req.file.filename);
        } else {
          console.error("Image compression failed:", error);
        }
      }
    );
    if (req.file) { anh_dai_dien = req.file.filename; }

    const user = {
      mat_khau,
      ho_ten,
      tuoi,
      anh_dai_dien
    };

    const userUpdated = await updateInfo(nguoi_dung_id, user);
    respsonseData(res, "Successfully handled", userUpdated, 200);
  } catch {
    respsonseData(res, "Unexpected Error", "", 500);
  }
}

export const uploadImg = async (req, res) => {
  try {
    let { nguoi_dung_id } = decodeToken(req.headers.token);
    nguoi_dung_id = parseInt(nguoi_dung_id);
    let { ten_hinh, mo_ta } = req.body;
    let duong_dan = "/public/img/newFeed/" + req.file.filename;

    const imgData = {
      ten_hinh,
      mo_ta,
      duong_dan,
      nguoi_dung_id
    };

    const imgUploaded = await createImg(imgData);
    respsonseData(res, "Successfully handled", imgUploaded, 200);
  } catch {
    respsonseData(res, "Unexpected Error", "", 500);
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
      respsonseData(res, "User is not existed", "", 400);
      return;
    }
    respsonseData(res, "Successfully handled", info, 200);
  } catch {
    respsonseData(res, "Unexpected Error", "", 500);
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
    respsonseData(res, "Successfully handled", data, 200);
  } catch {
    respsonseData(res, "Unexpected Error", "", 500);
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

    respsonseData(res, "Successfully handled", data, 200);
  } catch {
    respsonseData(res, "Unexpected Error", "", 500);
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

    respsonseData(res, "Image Deleted", "", 200);
  } catch {
    respsonseData(res, "Unexpected Error", "", 500);
  }
};


