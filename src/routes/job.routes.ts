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
router.use(protectAdmin);
router.post("/register", addJob);
router.get("/:id", singleJob);
router.delete("/:id", deleteJob);
router.patch("/status/:id", changeJobStatus);

export default router;
