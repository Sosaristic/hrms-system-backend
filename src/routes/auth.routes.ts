import { Router } from "express";
import {
  authLogin,
  confirmPasswordReset,
  forgetPassword,
  getToken,
  testRoute,
} from "../controllers/auth.controller";
import { protectUser } from "../middleware/auth.middleware";

const router = Router();

router.post("/auth/login", authLogin);
router.post("/auth/refresh/token", getToken);
router.post("/auth/forget-password", forgetPassword);
router.post("/auth/reset-password/:token", confirmPasswordReset);
router.use(protectUser);
router.get("/auth/test", testRoute);

export default router;
