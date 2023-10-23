"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileValueSchema = void 0;
var zod_1 = require("zod");
exports.FileValueSchema = zod_1.z.object({
    fieldname: zod_1.z.string({ required_error: "File is required" }),
    originalname: zod_1.z.string({ required_error: "File is required" }),
    encoding: zod_1.z.string({ required_error: "File is required" }),
    mimetype: zod_1.z.string({ required_error: "File is required" }),
    destination: zod_1.z.string({ required_error: "File is required" }),
    filename: zod_1.z.string({ required_error: "File is required" }),
    path: zod_1.z.string({ required_error: "File is required" }),
    size: zod_1.z.number({ required_error: "File is required" }),
});
// export const FileSchema = z.object({
//   file: FileValueSchema,
// });
//# sourceMappingURL=file.validators.js.map