import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const getUserDetail = async (nguoi_dung_id) => {
    const user = await prisma.nguoi_dung.findUnique({
        where: { nguoi_dung_id, }
    })
    if (user) return user || null
}

export const updateInfo = async (nguoi_dung_id, userNewData) => {
    const userDetail = await getUserDetail(nguoi_dung_id);

    if (userDetail) {
        const userUpdated = await prisma.nguoi_dung.update({
            where: { nguoi_dung_id },
            data: {
                email: userDetail.email,
                ho_ten: userNewData.ho_ten === null || userNewData.ho_ten === undefined ? userDetail.ho_ten : userNewData.ho_ten,
                mat_khau: userNewData.mat_khau === null || userNewData.mat_khau === undefined ? userDetail.mat_khau : bcrypt.hashSync(userNewData.mat_khau, 10),
                tuoi: userNewData.tuoi === null || userNewData.tuoi === undefined || +userNewData.tuoi === 0 ? +userDetail.tuoi : +userNewData.tuoi,
                anh_dai_dien: userNewData.anh_dai_dien === null || userNewData.anh_dai_dien === undefined ? userDetail.anh_dai_dien : userNewData.anh_dai_dien
            }
        });
        return userUpdated;
    } else return null;
}

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
