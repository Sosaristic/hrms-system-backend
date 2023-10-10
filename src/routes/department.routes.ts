import { Router } from "express";
import { protectAdmin } from "../middleware/auth.middleware";
import {
  addDepartment,
  allDepartment,
  deleteDepartment,
  editDepartment,
} from "../controllers/department.controller";

const router = Router();

router.use(protectAdmin);
router.get("/", allDepartment);
router.post("/register", addDepartment);
router.post("/edit/:id", editDepartment);
router.post("/delete/:id", deleteDepartment);

export default router;
