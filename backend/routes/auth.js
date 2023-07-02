import express from "express";
import {
  register,
  authUser,
  getUserProfile,
  logout,
  updateUserProfile,
  isAuth,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

router.post("/login", authUser);
router.post("/logout", logout);
router.post("/register", register);
router.get("/check", isAuth);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
