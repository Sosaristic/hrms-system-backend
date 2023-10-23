"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        console.log({ baseUrl: req.baseUrl });
        return cb(null, "./public");
    },
    filename: function (req, file, cb) {
        return cb(null, "".concat(Date.now(), "_").concat(file.originalname));
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
//# sourceMappingURL=upload.middleware.js.map