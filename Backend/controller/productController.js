const fs=require("fs")
const ProductModel = require("../models/Product.Model.js")
const CategoryModel=require("../models/Category.Model.js")
const { default: slugify } = require("slugify")
const createProductController = async (req, res) => {
   try {
       const { name, slug, description, price, category, quantity, shipping } = req.fields
       const { photo } = req.files
       //validation
       switch (true) {
           case !name:
               return res.status(500).send({message:"Name is required"})
           case !description:
               return res.status(500).send({message:"Description is required"})
           case !price:
               return res.status(500).send({message:"Price is required"})
           case !category:
               return res.status(500).send({message:"category is required"})
           case !quantity:
               return res.status(500).send({message:"Quantity is required"})
           
           case photo && photo.size>1000000:
               return res.status(500).send({ message: "photo less than 16mb required" })
           
           
       }
       const product = await new ProductModel({ ...req.fields,slug: slugify(name) })
       if (photo) {
           product.photo.data = fs.readFileSync(photo.path);
           product.photo.contentType=photo.type
       }
       await product.save()
       return res.status(201).send({
           success: true,
           message: "Product created successfully",
           product
           
       })
   } catch (error) {
       console.log(error)
       return res.status(500).send({
           success: false,
           message: "Error occures while updating category",
           error
       })
   }
}

const getProductController = async (req, res) => {
    try {
        const product = await ProductModel.find({}).populate("category").select("-photo").limit(12).sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            totalCount:product.length,
            message: "Product listed successfully",
            product,
            
    })
    } catch (error) {
        console.log("error")
        return res.status(500).send({
            success: false,
            message: "Error while getting products",
            error
        })
    }
   
}
const getSingleProductController = async (req, res) => {
    try {
        const product = await ProductModel.findOne({ slug: req.params.slug }).select("-photo").populate("category")
        return res.status(200).send({
            success: true,
           
            message: "Single Product listed successfully",
            product,
            
    })
    } catch (error) {
        console.log("error")
        return res.status(500).send({
            success: false,
            message: "Error while getting products",
            error
        })
    }
   
}
const getPhotoController = async(req,res) => {
    try {
        const product = await ProductModel.findById(req.params.pid).select("photo")
        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product not found"
            });
        }
        if ( product.photo.data ) {
            res.set("Content-Type", product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log("error")
        return res.status(500).send({
            success: false,
            message: "Error while getting photod",
            error
        })
    }
}
    
const deleteController=async (req,res) => {
    try {
         await ProductModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: "product deleted successfully",
           
        })
        
      } catch (error) {
          console.log(error),
              res.status(500).send({
                  success: false,
                  message: "Error while deleting product",
                  
           })   
        
      }
}

//update product 
const updateProductController = async(req,res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({message:"Name is required"})
            case !description:
                return res.status(500).send({message:"Description is required"})
            case !price:
                return res.status(500).send({message:"Price is required"})
            case !category:
                return res.status(500).send({message:"category is required"})
            case !quantity:
                return res.status(500).send({message:"Quantity is required"})
            case !shipping:
                return res.status(500).send({message:"Shipping address is required"})
            case photo && photo.size>1000000:
                return res.status(500).send({ message: "photo less than 16mb required" })
            
            
        }
        const product = await  ProductModel.findByIdAndUpdate(req.params.id,{ ...req.fields,slug: slugify(name) },{new:true})
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType=photo.type
        }
        await product.save()
        return res.status(201).send({
            success: true,
            message: "Product updated successfully",
            product
            
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error occures while updating product",
            error
        })
    }
}
// filters
const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
      let args = {};
      if ( checked.length > 0) args.category = checked;
      if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
      const products = await ProductModel.find(args);
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Filtering Products",
        error,
      });
    }
  };
  

//count product 
const ProductCountController = async (req, res) => {
    try {
        const total = await ProductModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total,
            
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error occures while counting product",
            error
        
        })
    }
}
// product  list
const ProductListController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await ProductModel
          .find({})
          .select("-photo")
          .skip((page - 1) * perPage)
          .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
                success: true,
                products,
              });
        
            
       
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error occures while listing product",
            error
        
        })
    }
}

//get product category wise
const ProductCategoryController = async (req, res) => {
    try {
       
        const { slug } = req.params
        const category = await CategoryModel.findOne({ slug })
        const product = await ProductModel.find({ category }).populate("category")
        res.status(200).send({
            success: true,
            category,
            product
        })
            
       
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error occures while listng product category wise",
            error
        
        })
    }
}
// Product Search Controller
const ProductSearchController = async (req, res) => {
    try {
        const { keyWord } = req.params;

        // Ensure keyWord is defined and is a string
        if (!keyWord) {
            return res.status(400).send({
                success: false,
                message: "Keyword parameter is required"
            });
        }

        const regexString = keyWord.toString();

        // Perform the search query with regex and options
        const result = await ProductModel.find({
            $or: [
                { name: { $regex: regexString, $options: "i" } },
                { description: { $regex: regexString, $options: "i" } }
            ]
        }).select("-photo");

        res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error occurred while searching for product",
            error
        });
    }
};


module.exports = {
    createProductController,
    getProductController, getSingleProductController,
    getPhotoController,
    deleteController, updateProductController,
    productFiltersController,
    ProductCountController,
    ProductListController,
    ProductSearchController,
    ProductCategoryController
}