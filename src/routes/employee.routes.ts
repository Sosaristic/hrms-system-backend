import { Router } from "express";
import {
  allEmployee,
  registerEmployee,
  singleEmployee,
} from "../controllers/employee.controllers";
import { protectAdmin } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerEmployee);
router.use(protectAdmin);
router.get("/", allEmployee);
router.get("/:id", singleEmployee);

export default router;
