const express = require("express")
const formidable = require('express-formidable');
const { requireSignin, isAdmin } = require("../middleware/authMiddleware");
const { createProductController, getProductController, getSingleProductController, getPhotoController, updateProductController, deleteController, ProductCountController, ProductListController, productFiltersController, ProductSearchController, ProductCategoryController } = require("../controller/productController");
const router = express.Router()

router.post("/create-product", requireSignin, isAdmin, formidable(), createProductController)
//update product
router.put("/update-product/:id", requireSignin, isAdmin, formidable(), updateProductController)

//get all product
router.get("/get-product", getProductController)

//get single product
router.get("/get-product/:slug",getSingleProductController)
//get single photo
router.get("/product-photo/:pid",getPhotoController)
//delete single photo
router.delete("/delete-product/:id", requireSignin, isAdmin, deleteController)
//filter product
router.post("/product-filters",productFiltersController)
// product count
router.get("/product-count",ProductCountController)
// product per page
router.get("/product-list/:page", ProductListController)
//search product
router.get("/product-search/:keyWord",ProductSearchController)
//category wise product
router.get("/product-category/:slug",ProductCategoryController)

module.exports=router