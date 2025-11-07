import express from "express";
import { addNew, getAll } from "../controllers/categoryController.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/create",upload.single('image'), addNew);
router.get("/getAll", getAll);

export default router;