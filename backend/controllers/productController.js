import Product from "../models/Product.js";
import fs from "fs";
import path from "path";

// Create a new product
export const createProduct = async (req, res) => {
  
  const { name, price, quantity, category, reviews } = req.body;
  const image = req.file; // Assuming you're using multer for image upload

  if (!name || !price || !quantity || !image) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // Save image to server
    // const uploadPath = path.join("uploads", image.originalname);
    // fs.writeFileSync(uploadPath, image.buffer);
    const normalizedPath = image.path.replace(/\\/g, "/");

    const newProduct = new Product({
      name,
      price,
      quantity,
      category,
      image: normalizedPath,
      reviews
    });

    await newProduct.save();

    return res.status(201).json({ success: true, message: "Product created", product: newProduct });
  } catch (error) {
    console.error("Create product error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Get all products error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Get product by ID error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log('req recevie');
  
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, message: "Product deleted", product: deletedProduct });
  } catch (error) {
    console.error("Delete product error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};




// PUT /api/product/:id
export const UPDATEFLASH =  async (req, res) => {
  try {
    const { flashSale } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { flashSale },
      { new: true }
    );
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const BESTSALLING =  async (req, res) => {
  try {
    const { bestSalling } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { bestSalling },
      { new: true }
    );
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const GetByName = async (req, res) => {
  const { name } = req.params;
  const product = await Product.findOne({ name });
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
};
