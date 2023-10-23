"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_middleware_1 = require("../middleware/auth.middleware");
var candidate_controller_1 = require("../controllers/candidate.controller");
var router = (0, express_1.Router)();
router.use(auth_middleware_1.protectAdmin);
router.post("/register", candidate_controller_1.addCandidate);
router.get("/:id", candidate_controller_1.singleCandidate);
router.use(auth_middleware_1.protectAdmin);
router.get("/", candidate_controller_1.allCandidate);
router.delete("/:id", candidate_controller_1.deleteCandidate);
router.post("/accept/:id", candidate_controller_1.acceptCandidate);
router.post("/reject/:id", candidate_controller_1.rejectCandidate);
exports.default = router;
//# sourceMappingURL=candidate.routes.js.map