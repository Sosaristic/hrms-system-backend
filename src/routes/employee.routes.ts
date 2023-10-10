import { Router } from "express";
import { getToken } from "../controllers/auth.controller";
import { protectAdmin } from "../middleware/auth.middleware";
import { registerEmployee } from "../controllers/employee.controllers";

const router = Router();

router.post("/refresh/token", getToken);
router.use(protectAdmin);
router.post("/register", registerEmployee);

export default router;
