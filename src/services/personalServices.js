import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import fs from 'fs/promises';
const prisma = new PrismaClient();

export const getDetail = async (nguoi_dung_id) => {
    const user = await prisma.nguoi_dung.findUnique({
        where: { nguoi_dung_id, }
    })
    if (user) return user || null;
}

export const updateInfo = async (nguoi_dung_id, user) => {

    if (user.mat_khau.length === 0) user.mat_khau = null;
    if (user.ho_ten.length === 0) user.ho_ten = null;
    if (isNaN(+ user.tuoi) || + user.tuoi <= 0) user.tuoi = null;
    if (user.anh_dai_dien === undefined) user.anh_dai_dien = null;

    const userDetail = await getDetail(nguoi_dung_id);

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
                ho_ten: user.ho_ten === null ? userDetail.ho_ten : user.ho_ten,
                mat_khau: user.mat_khau === null ? userDetail.mat_khau : bcrypt.hashSync(user.mat_khau, 10),
                tuoi: user.tuoi === null ? +userDetail.tuoi : +user.tuoi,
                anh_dai_dien: user.anh_dai_dien === null ? userDetail.anh_dai_dien : user.anh_dai_dien
            }
        });
        
        return userUpdated;
    } else return null;
}