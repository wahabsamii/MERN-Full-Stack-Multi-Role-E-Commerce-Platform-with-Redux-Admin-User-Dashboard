import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {type: String, required:true},
    price: {type: String, required:true},
    category: {type: String, required:true},
    quantity: {type: Number, required:true},
    image:{type: String, required: true},
    reviews:{type: String, required: true},
    flashSale: {type: Boolean, default: false},
    bestSalling: {type: Boolean, default: false}
}, {timestamps: true});

const Product = await mongoose.model("Product", productSchema);
export default Product;