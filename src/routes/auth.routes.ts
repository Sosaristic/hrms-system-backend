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

router.post("/login", authLogin);
router.post("/refresh/token", getToken);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:token", confirmPasswordReset);
router.use(protectUser);
router.get("/auth/test", testRoute);

export default router;
