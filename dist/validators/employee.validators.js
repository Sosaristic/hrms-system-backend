"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEmployeeSchema = void 0;
var zod_1 = require("zod");
var employeeGender;
(function (employeeGender) {
    employeeGender["MALE"] = "MALE";
    employeeGender["FEMALE"] = "FEMALE";
})(employeeGender || (employeeGender = {}));
exports.addEmployeeSchema = zod_1.z
    .object({
    candidateId: zod_1.z.string({ required_error: "candidateId is required" }),
    gender: zod_1.z.nativeEnum(employeeGender, {
        required_error: "Invalid  Gender",
    }),
    image: zod_1.z.string({ required_error: "Profile image is required" }),
    password: zod_1.z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Pasword must be 8 or more characters long" }),
    confirmPassword: zod_1.z
        .string({ required_error: "confirmPassword is required" })
        .min(8, { message: "Password must be 8 or more characters long" }),
})
    .refine(function (values) {
    return values.password === values.confirmPassword;
}, {
    message: "Passwords must match!",
    path: ["confirmPassword"],
});
//# sourceMappingURL=employee.validators.js.map