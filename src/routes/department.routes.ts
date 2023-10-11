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
router.patch("/edit/:id", editDepartment);
router.delete("/delete/:id", deleteDepartment);

export default router;
