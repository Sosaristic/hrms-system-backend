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

const router = Router();

router.use(protectAdmin);

router.get("/", allCandidate);
router.post("/register", addCandidate);
router.get("/:id", singleCandidate);
router.delete("/:id", deleteCandidate);
router.post("/accept/:id", acceptCandidate);
router.post("/reject/:id", rejectCandidate);

export default router;
