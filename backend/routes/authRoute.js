import express from "express";
import { getAllUsers, login, logout, register, UpdateUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get('/all', getAllUsers);
router.post("/update", UpdateUser);
export default router;