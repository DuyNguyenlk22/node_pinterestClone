import multer from 'multer';

let storageAvatar = multer.diskStorage({
    destination: process.cwd() + "/public/img/avatar",
    filename: (req, file, callback) => {
        let newName = new Date().getTime() + "_" + file.originalname;
        callback(null, newName);
    }
})
let storageNewFeed = multer.diskStorage({
    destination: process.cwd() + "/public/img/newFeed",
    filename: (req, file, callback) => {
        let newName = new Date().getTime() + "_" + file.originalname;
        callback(null, newName);
    }
})
let storageComment = multer.diskStorage({
    destination: process.cwd() + "/public/img/comment",
    filename: (req, file, callback) => {
        let newName = new Date().getTime() + "_" + file.originalname;
        callback(null, newName);
    }
})
export const uploadAvatar = multer({ storage: storageAvatar });
export const uploadNewFeed = multer({ storage: storageNewFeed });
export const uploadComment = multer({ storage: storageComment });

