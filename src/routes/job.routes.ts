import { Router } from "express";

import { protectAdmin } from "../middleware/auth.middleware";
import {
  addJob,
  allJobs,
  changeJobStatus,
  deleteJob,
  singleJob,
} from "../controllers/job.controller";

const router = Router();

router.get("/", allJobs);
router.get("/:id", singleJob);
router.use(protectAdmin);
router.post("/register", addJob);
router.delete("/:id", deleteJob);
router.patch("/status/:id", changeJobStatus);

export default router;
