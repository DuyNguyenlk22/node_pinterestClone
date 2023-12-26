import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createImg = async (imgData) => {
    const newImg = await prisma.hinh_anh.create({ data: imgData });

    if (newImg) {
        const { hinh_id, nguoi_dung_id } = newImg;
        const ngay_luu = new Date().toISOString();;

        await prisma.luu_anh.create({
            data: { hinh_id, nguoi_dung_id, ngay_luu }
        });

        return newImg;
    } else return null;
}

