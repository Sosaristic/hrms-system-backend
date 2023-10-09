import { Router } from "express";

import { protectAdmin } from "../middleware/auth.middleware";
import {
  acceptRejectCandidate,
  addCandidate,
  allCandidate,
  deleteCandidate,
  singleCandidate,
} from "../controllers/candidate.controller";

const router = Router();

router.use(protectAdmin);
router.post("/", addCandidate);
router.get("/", allCandidate);
router.get("/:id", singleCandidate);
router.put("/:id", acceptRejectCandidate);
router.delete("/:id", deleteCandidate);

export default router;
