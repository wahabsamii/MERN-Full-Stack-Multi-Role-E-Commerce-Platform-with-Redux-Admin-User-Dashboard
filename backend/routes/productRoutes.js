import express from "express";
import { BESTSALLING, createProduct, deleteProduct, getAllProducts, GetByName, getProductById, UPDATEFLASH } from "../controllers/productController.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/create",upload.single('image'), createProduct);
router.get('/all', getAllProducts);
router.get('/single/:id', getProductById);
router.post('/delete/:id', deleteProduct);
router.put('/:id', UPDATEFLASH);
router.put('/best/:id', BESTSALLING);
router.get("/:name", GetByName);
export default router;