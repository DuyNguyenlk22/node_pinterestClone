import { PrismaClient } from "@prisma/client";
import { respsonseData } from "../config/response.js";

const prisma = new PrismaClient();

export const getAllImg = async (req, res) => {
  try {
    let data = await prisma.hinh_anh.findMany();

    respsonseData(res, "Successfully handled", data, 200);
  } catch {
    respsonseData(res, "Unexpected Error", "", 500);
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

    respsonseData(res, "Successfully handled", dataSearch, 200);
  } catch {
    respsonseData(res, "Unexpected Error", "", 500);
  }
};
