"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetSchema = exports.emailBodySchema = exports.registerBodySchema = exports.loginBodySchema = void 0;
var zod_1 = require("zod");
exports.loginBodySchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "Email is required",
    })
        .email({ message: "Not a valid email" }),
    password: zod_1.z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Must be 8 or more characters long" }),
});
exports.registerBodySchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: "name is required" }),
    email: zod_1.z
        .string({
        required_error: "Email is required",
    })
        .email({ message: "Not a valid email" }),
    password: zod_1.z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Must be 8 or more characters long" }),
});
exports.emailBodySchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "Email is required",
    })
        .email({ message: "Not a valid email" }),
});
exports.passwordResetSchema = zod_1.z
    .object({
    token: zod_1.z.string(),
    password: zod_1.z
        .string()
        .min(8, { message: "Must be 8 or more characters long" }),
    confirmPassword: zod_1.z
        .string()
        .min(8, { message: "Must be 8 or more characters long" }),
})
    .refine(function (values) {
    return values.password === values.confirmPassword;
}, {
    message: "Passwords must match!",
    path: ["confirmPassword"],
});
//# sourceMappingURL=auth.validators.js.map