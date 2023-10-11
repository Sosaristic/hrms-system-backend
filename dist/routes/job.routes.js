"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_middleware_1 = require("../middleware/auth.middleware");
var job_controller_1 = require("../controllers/job.controller");
var router = (0, express_1.Router)();
router.get("/", job_controller_1.allJobs);
router.use(auth_middleware_1.protectAdmin);
router.post("/register", job_controller_1.addJob);
router.get("/:id", job_controller_1.singleJob);
router.delete("/:id", job_controller_1.deleteJob);
router.patch("/status/:id", job_controller_1.changeJobStatus);
exports.default = router;
//# sourceMappingURL=job.routes.js.map