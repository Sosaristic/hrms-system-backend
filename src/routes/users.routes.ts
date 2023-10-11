import { Router } from "express";
import {
  login,
  register,
  forgotPassword,
  logout,
} from "../controllers/users.controller";

const router = Router();

// User routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/logout", logout);

export default router;
