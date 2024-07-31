const express = require("express")
const { requireSignin, isAdmin } = require("../middleware/authMiddleware.js")
const { createCategoryController,
    updateCategoryController,
    categoryController, singleCategoryController,
    deleteCategoryController } = require("../controller/categoryController.js")
const router = express.Router();

router.post("/create-category", requireSignin, isAdmin, createCategoryController)

//method-put/upadate category
router.put("/update-category/:id", requireSignin, isAdmin, updateCategoryController)



//get all category
router.get("/get-category",categoryController)
//get single category
router.get("/get-category/:slug",singleCategoryController)
//delete single category
router.delete("/delete-category/:id",requireSignin,isAdmin,deleteCategoryController)

module.exports = router;
