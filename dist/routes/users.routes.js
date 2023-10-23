"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_controller_1 = require("../controllers/users.controller");
var router = (0, express_1.Router)();
// User routes
router.post("/register", users_controller_1.register);
router.post("/login", users_controller_1.login);
router.post("/forgot-password", users_controller_1.forgotPassword);
router.post("/logout", users_controller_1.logout);
exports.default = router;
//# sourceMappingURL=users.routes.js.map