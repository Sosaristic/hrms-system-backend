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

router.use(protectAdmin);
router.post("/", addJob);
router.get("/", allJobs);
router.get("/:id", singleJob);
router.delete("/:id", deleteJob);
router.post("/status/:id", changeJobStatus);

export default router;
