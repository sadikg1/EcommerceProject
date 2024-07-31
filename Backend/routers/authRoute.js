const express = require("express");
const { registerController, loginController,testContoller, forgotPasswordController, updateProfileController } = require("../controller/authController");
const { requireSignin, isAdmin } = require("../middleware/authMiddleware");

// Router object
const router = express.Router();

// Routing
// Register route || Method: POST
router.post("/register", registerController);

// Login Route || Method: POST
router.post("/login", loginController);
//forgot password
router.post("/forgot-password",forgotPasswordController)

//testRoute
router.get("/test", requireSignin, isAdmin, testContoller)

router.get("/user-auth", requireSignin, (req,res) => {
    res.status(200).send({
          ok:true
    })
})
router.get("/admin-auth", requireSignin,isAdmin, (req,res) => {
    res.status(200).send({
          ok:true
    })
})
//update profile
router.put("/profile", requireSignin, updateProfileController);
module.exports = router;
