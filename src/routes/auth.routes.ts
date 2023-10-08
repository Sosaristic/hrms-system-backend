import { Router } from "express";
import {
  authLogin,
  confirmPasswordReset,
  forgetPassword,
  getToken,
} from "../controllers/auth.controller";

const router = Router();

router.post("/auth/login", authLogin);
router.get("/auth/refresh-token", getToken);
router.post("/auth/forget-password", forgetPassword);
router.post("/auth/reset-password/:token", confirmPasswordReset);

export default router;
