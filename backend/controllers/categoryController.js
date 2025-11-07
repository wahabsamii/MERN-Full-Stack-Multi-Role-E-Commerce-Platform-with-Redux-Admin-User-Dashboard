import Category from "../models/Category.js"



export const addNew = async(req,res) => {
    const {name} = req.body;
    const image = req.file;
    try {
        const normalizedPath = image.path.replace(/\\/g, "/");
        const category = new Category({
            name,
            image: normalizedPath
        });
        await category.save();
        return res.json({success: true, category, message: "Category Added!"});
    } catch (error) {
        console.log(error);
    }
}

export const getAll = async(req,res) => {
  
    try {
        const category = await Category.find();
        return res.json({success: true, category});
    } catch (error) {
        console.log(error);
    }
}

export const DeleteCategory = async(req,res) => {
    const {id} = req.params;
    try {
        const deleteCate = await Category.findByIdAndDelete(id);
        return res.json({success: true, message: "Category Deleted!"});
    } catch (error) {
        console.log(error);
    }
}