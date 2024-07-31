const slugify  = require("slugify")
const CategoryModel = require("../models/Category.Model")

const createCategoryController = async(req,res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.send({message:"name is required"})
        }
        const existingCategory = await CategoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success:true,
                message: "Category already exists"
            })
            
        }
        const createCategory = await new CategoryModel({ name, slug: slugify(name) }).save()
        return res.status(201).send({
            success:true,
            message: "Category Created",
            createCategory
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in category",
            error
        })
    }
}


//update category
const updateCategoryController = async (req, res) => {
    try {
        const {name} = req.body
        const {id}=req.params
        const category = await CategoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: "Category Updated successfully",
            category
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in update Controller",
            error
        })
    }
   
    
}

//get category
const categoryController = async(req, res)=> {
    try {
        const category = await CategoryModel.find({})
        res.status(200).send({
            success: true,
            message: "All category lists",
            category
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting category",
            error
        })
        
    }
}
//get single category
const singleCategoryController = async(req, res)=> {
    try {
        const category = await CategoryModel.find({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: "single category listed",
            category
        })
       
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting category",
            error
        })
        
    }
}
//delete single category
const deleteCategoryController = async(req, res)=> {
    try {
        const {id}=req.params
        const category = await CategoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Category deleted successfully",
            category
        })
     
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while deleting category",
            error
        })
        
    }
}
module.exports = { createCategoryController, updateCategoryController,categoryController,singleCategoryController,deleteCategoryController}