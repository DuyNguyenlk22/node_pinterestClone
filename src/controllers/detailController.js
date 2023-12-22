import { PrismaClient } from "@prisma/client";
import { respsonseData } from "../config/response.js";

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

