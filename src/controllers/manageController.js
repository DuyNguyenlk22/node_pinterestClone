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
    const dataImg = await prisma.hinh_anh.findFirst({
      where: {
        hinh_id,
      },
    });
    if (dataImg) {
      await prisma.$transaction([
        prisma.binh_luan.deleteMany({
          where: { hinh_id },
        }),
        prisma.luu_anh.deleteMany({
          where: { hinh_id },
        }),
        prisma.hinh_anh.delete({
          where: { hinh_id },
        }),
      ]);
      respsonseData(res, "Image Deleted", "", 200);
    } else {
      respsonseData(res, "Image is not existed or have been deleted", "", 404);
    }
  } catch {
    respsonseData(res, "Unexpected Error", "", 500);
  }
};
