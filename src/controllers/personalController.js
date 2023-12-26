import compress_images from 'compress-images';
import fs from 'fs'
import { decodeToken } from "../config/jwt.js";
import { respsonseData } from "../config/response.js";
import { updateInfo } from '../services/personalServices.js';

export const updateInfoUser = async (req, res) => {
    // try {
        let { nguoi_dung_id } = decodeToken(req.headers.token);
        nguoi_dung_id = parseInt(nguoi_dung_id);
        let { mat_khau, ho_ten, tuoi } = req.body;

        let anh_dai_dien
        compress_images(
            process.cwd() + "/public/inputImg/avatar/" + req.file.filename,
            process.cwd() + "/public/img/avatar/",
            { compress_force: false, statistic: true, autoupdate: true }, false,
            { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
            { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
            { svg: { engine: "svgo", command: "--multipass" } },
            { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
            function (error, completed) {
                if (completed) {
                    fs.unlinkSync(process.cwd() + "/public/inputImg/avatar/" + req.file.filename);
                } else {
                    console.error("Image compression failed:", error);
                }
            }
        );
        if (req.file) { anh_dai_dien = req.file.filename; }

        const user = {
            mat_khau,
            ho_ten,
            tuoi,
            anh_dai_dien
        };

        const userUpdated = await updateInfo(nguoi_dung_id, user);
        respsonseData(res, "Successfully handled", userUpdated, 200);
    // } catch {
    //     respsonseData(res, "Unexpected Error", "", 500);
    // }
}

