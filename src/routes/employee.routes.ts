import { Router } from "express";
import {
  allEmployee,
  registerEmployee,
  singleEmployee,
} from "../controllers/employee.controllers";

const router = Router();

// router.use(protectAdmin);
router.get("/", allEmployee);
router.post("/register", registerEmployee);
router.get("/:id", singleEmployee);

export default router;
