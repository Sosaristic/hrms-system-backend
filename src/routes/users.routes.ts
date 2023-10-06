import { Router } from "express";
import {
  login,
  register,
  logout,
  passwordReset,
  requestResetPassword,
} from "../controllers/users.controller";
import { resetPasswordLimiter } from "../utils/rateLimiters/resetPassword.ratelimiter";
const router = Router();

// User routes
router.post("/register", register);
router.post("/login", login);
router.post("/reset", passwordReset);
router.post(
  "/request-reset",
  resetPasswordLimiter(3, "Too many requests. Please try again later."),
  requestResetPassword
);

router.post("/logout", logout);

export default router;