const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/products");
    },
    filename: (req, file, cb) => {
        const filename =
            Date.now() + "-" + Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("File harus gambar"), false);
    }
};

module.exports = multer({ storage, fileFilter });
