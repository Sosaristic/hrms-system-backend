"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var router = (0, express_1.Router)();
router.post("/login", auth_controller_1.authLogin);
router.post("/register", auth_controller_1.authRegister);
router.get("/confirm/admin", auth_controller_1.confirmAdmin);
router.post("/refresh/token", auth_controller_1.getToken);
router.post("/forget-password", auth_controller_1.forgetPassword);
router.post("/reset-password/:token", auth_controller_1.confirmPasswordReset);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map