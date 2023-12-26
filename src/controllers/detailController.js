import { PrismaClient } from "@prisma/client";
import { respsonseData } from "../config/response.js";
import { decodeToken } from "../config/jwt.js";
import fs from 'fs';
import compress_images from 'compress-images';

const prisma = new PrismaClient();

export const getImageDetail = async (req, res) => {
    try {
        let hinh_id = parseInt(req.params.hinh_id);

        let data = await prisma.hinh_anh.findUnique({
            where: {
                hinh_id,
            },
        });

        respsonseData(res, "Successfully handled", data, 200);
    } catch {
        respsonseData(res, "Unexpected Error", "", 500);
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

        respsonseData(res, "Successfully handled", data, 200);
    } catch {
        respsonseData(res, "Unexpected Error", "", 500);
    }
};

export const getImageIsSaved = async (req, res) => {
    try {
        let hinh_id = parseInt(req.params.hinh_id);

        let { nguoi_dung_id } = decodeToken(req.headers.token);
        nguoi_dung_id = parseInt(nguoi_dung_id);

        let data = await prisma.luu_anh.findFirst({
            where: {
                AND: {
                    hinh_id,
                    nguoi_dung_id,
                }
            },
        });

        if (!data) {
            respsonseData(res, "Image have not saved yet", false, 404);
        } else {
            respsonseData(res, "Image saved", true, 200);
        }
    } catch (error) {
        respsonseData(res, "Unexpected Error", "", 500);
    }
};


export const addComment = async (req, res) => {
    try {
        let { nguoi_dung_id } = decodeToken(req.headers.token);
        nguoi_dung_id = parseInt(nguoi_dung_id);

        let { noi_dung, hinh_id } = req.body;
        hinh_id = parseInt(hinh_id);
        compress_images(
            process.cwd() + "/public/inputImg/comment/" + req.file.filename,
            process.cwd() + "/public/img/comment/",
            { compress_force: false, statistic: true, autoupdate: true }, false,
            { jpg: { engine: "mozjpeg", command: ["-quality", "10"] } },
            { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
            { svg: { engine: "svgo", command: "--multipass" } },
            { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
            function (error, completed) {
                if (completed) {
                    fs.unlinkSync(process.cwd() + "/public/inputImg/comment/" + req.file.filename);
                } else {
                    console.error("Image compression failed:", error);
                }
            }
        );

        let anh_dinh_kem = req.file.filename;
        let ngay_binh_luan = new Date().toISOString();

        const commentData = {
            nguoi_dung_id,
            hinh_id,
            ngay_binh_luan,
            noi_dung,
            anh_dinh_kem
        };

        const commentUploaded = await prisma.binh_luan.create({ data: commentData });

        respsonseData(res, "Add comment successfully", commentUploaded, 200);
    } catch (error) {
        respsonseData(res, "Unexpected Error", error, 500);
    }
};
