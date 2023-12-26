import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import fs from 'fs/promises';
const prisma = new PrismaClient();

export const getUserDetail = async (nguoi_dung_id) => {
    const user = await prisma.nguoi_dung.findUnique({
        where: { nguoi_dung_id, }
    })
    if (user) return user || null
}

export const updateInfo = async (nguoi_dung_id, userNewData) => {

    if (userNewData.mat_khau.length === 0) userNewData.mat_khau = null;
    if (userNewData.ho_ten.length === 0) userNewData.ho_ten = null;
    if (isNaN(+userNewData.tuoi) || +userNewData.tuoi <= 0) userNewData.tuoi = null;
    if (userNewData.anh_dai_dien === undefined) userNewData.anh_dai_dien = null;

    const userDetail = await getUserDetail(nguoi_dung_id);

    if (userDetail) {
        if (userDetail.anh_dai_dien) {
            const oldAvatarPath = `public/img/avatar/${userDetail.anh_dai_dien}`;
            try {
                await fs.unlink(oldAvatarPath);
                console.log(`Old avatar file deleted: ${oldAvatarPath}`);
            } catch (error) {
                console.error(`Error deleting old avatar file: ${oldAvatarPath}`, error);
            }
        }
        const userUpdated = await prisma.nguoi_dung.update({
            where: { nguoi_dung_id },
            data: {
                email: userDetail.email,
                ho_ten: userNewData.ho_ten === null ? userDetail.ho_ten : userNewData.ho_ten,
                mat_khau: userNewData.mat_khau === null ? userDetail.mat_khau : bcrypt.hashSync(userNewData.mat_khau, 10),
                tuoi: userNewData.tuoi === null ? +userDetail.tuoi : +userNewData.tuoi,
                anh_dai_dien: userNewData.anh_dai_dien === null ? userDetail.anh_dai_dien : userNewData.anh_dai_dien
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

