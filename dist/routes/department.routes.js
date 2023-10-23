"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_middleware_1 = require("../middleware/auth.middleware");
var department_controller_1 = require("../controllers/department.controller");
var router = (0, express_1.Router)();
router.use(auth_middleware_1.protectAdmin);
router.get("/", department_controller_1.allDepartment);
router.post("/register", department_controller_1.addDepartment);
router.patch("/edit/:id", department_controller_1.editDepartment);
router.delete("/delete/:id", department_controller_1.deleteDepartment);
exports.default = router;
//# sourceMappingURL=department.routes.js.map