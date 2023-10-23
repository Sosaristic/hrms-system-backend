import { Router } from "express";

import { protectAdmin } from "../middleware/auth.middleware";
import {
  acceptCandidate,
  addCandidate,
  allCandidate,
  deleteCandidate,
  rejectCandidate,
  singleCandidate,
} from "../controllers/candidate.controller";
import { upload } from "../middleware/upload.middleware";

const router = Router();

router.use(upload.single("resume"));
router.post("/register", addCandidate);
router.get("/:id", singleCandidate);
router.use(protectAdmin);
router.get("/", allCandidate);
router.delete("/:id", deleteCandidate);
router.post("/accept/:id", acceptCandidate);
router.post("/reject/:id", rejectCandidate);

export default router;
