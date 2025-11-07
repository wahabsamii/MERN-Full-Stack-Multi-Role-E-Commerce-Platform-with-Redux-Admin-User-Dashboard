import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true}
});

const Category = await mongoose.model("Category", categorySchema);
export default Category;