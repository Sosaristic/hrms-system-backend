"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var employee_controllers_1 = require("../controllers/employee.controllers");
var auth_middleware_1 = require("../middleware/auth.middleware");
var router = (0, express_1.Router)();
router.post("/register", employee_controllers_1.registerEmployee);
router.use(auth_middleware_1.protectAdmin);
router.get("/", employee_controllers_1.allEmployee);
router.get("/:id", employee_controllers_1.singleEmployee);
exports.default = router;
//# sourceMappingURL=employee.routes.js.map
