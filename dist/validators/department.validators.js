"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addHeadSchema = exports.addDepartmentSchema = void 0;
var zod_1 = require("zod");
exports.addDepartmentSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: "Department name is required" }),
    departmentHead: zod_1.z.string().optional(),
});
exports.addHeadSchema = zod_1.z.object({
    departmentHead: zod_1.z.string(),
});
//# sourceMappingURL=department.validators.js.map