import { decodeToken } from "../config/jwt.js";
import { respsonseData } from "../config/response.js";
import { createImg } from "../services/addImgServices.js";

export const uploadImg = async (req, res) => {
    try {
        let { nguoi_dung_id } = decodeToken(req.headers.token);
        nguoi_dung_id = parseInt(nguoi_dung_id);
        let { ten_hinh, mo_ta } = req.body;
        let duong_dan = req.file.filename;

        const imgData = {
            ten_hinh,
            mo_ta,
            duong_dan,
            nguoi_dung_id
        };

        const imgUploaded = await createImg(imgData);
        respsonseData(res, "Successfully handled", imgUploaded, 200);
    } catch {
        respsonseData(res, "Unexpected Error", "", 500);
    }
}

