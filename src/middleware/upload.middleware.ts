import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log({ baseUrl: req.baseUrl });
    return cb(null, "./public");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});
export const upload = multer({ storage });
