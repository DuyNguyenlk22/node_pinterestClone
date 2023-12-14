import { PrismaClient } from "@prisma/client";
import { respsonseData } from "../config/response.js";

const prisma = new PrismaClient();

export const getAllImg = async (req, res) => {
  try {
    let data = await prisma.hinh_anh.findMany();

    respsonseData(res, "Xử lý thành công", data, 200);
  } catch {
    respsonseData(res, "Đã có lỗi...", "", 500);
  }
};

export const searchImgByName = async (req, res) => {
  try {
    let { imgName } = req.params;

    let dataSearch = await prisma.hinh_anh.findMany({
      where: {
        ten_hinh: {
          contains: imgName,
        },
      },
    });

    respsonseData(res, "Xử lý thành công", dataSearch, 200);
  } catch {
    respsonseData(res, "Đã có lỗi...", "", 500);
  }
};
