import { Router } from "express";
import {
  authLogin,
  confirmPasswordReset,
  forgetPassword,
  getToken,
} from "../controllers/auth.controller";

const router = Router();

router.post("/login", authLogin);
router.post("/refresh/token", getToken);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:token", confirmPasswordReset);

export default router;
