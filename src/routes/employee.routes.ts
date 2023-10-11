import { Router } from "express";
import {
  allEmployee,
  registerEmployee,
} from "../controllers/employee.controllers";

const router = Router();

// router.use(protectAdmin);
router.get("/", allEmployee);
router.post("/register", registerEmployee);

export default router;
