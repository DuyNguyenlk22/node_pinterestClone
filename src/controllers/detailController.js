import { PrismaClient } from "@prisma/client";
import { respsonseData } from "../config/response.js";
import { decodeToken } from "../config/jwt.js";

const prisma = new PrismaClient();

export const getImageDetail = async (req, res) => {
  try {
    let hinh_id = parseInt(req.params.hinh_id);

    let data = await prisma.hinh_anh.findUnique({
      where: {
        hinh_id,
      },
    });

    respsonseData(res, "Xử lý thành công", data, 200);
  } catch {
    respsonseData(res, "Đã có lỗi...", "", 500);
  }
};

export const getImageComments = async (req, res) => {
  try {
    let hinh_id = parseInt(req.params.hinh_id);

    let data = await prisma.binh_luan.findMany({
      where: {
        hinh_id,
      },
    });

    respsonseData(res, "Xử lý thành công", data, 200);
  } catch {
    respsonseData(res, "Đã có lỗi...", "", 500);
  }
};

export const getImageIsSaved = async (req, res) => {
  try {
    let hinh_id = parseInt(req.params.hinh_id);

    let data = await prisma.luu_anh.findMany({
      where: {
        hinh_id,
      },
    });

    respsonseData(res, "Xử lý thành công", data, 200);
  } catch {
    respsonseData(res, "Đã có lỗi...", "", 500);
  }
};

export const addComment = async (req, res) => {
  // try {
  let { nguoi_dung_id } = decodeToken(req.headers.token);
  nguoi_dung_id = parseInt(nguoi_dung_id);

  let { noi_dung, hinh_id } = req.body;
  hinh_id = parseInt(hinh_id);

  let anh_dinh_kem = "/public/img/comment/" + req.file.filename;
  console.log("😐 ~ anh_dinh_kem:👉", anh_dinh_kem);
  let ngay_binh_luan = new Date().toISOString();

  const commentData = { nguoi_dung_id, hinh_id, ngay_binh_luan, noi_dung, anh_dinh_kem };
  console.log("commentData: ", commentData);

  const commentUploaded = await prisma.binh_luan.create({ data: commentData });
  console.log("commentUploaded: ", commentUploaded);
  respsonseData(res, "Xử lý thành công", commentUploaded, 200);
  //   } catch {
  //     respsonseData(res, "Đã có lỗi xảy ra...", "", 500);
  //   }
};
