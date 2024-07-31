const UserModel = require("../models/User.Model");
const { hashPassword, comparePassword } = require("../utils/authHelper");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address,answer } = req.body;
    //validation
    if (!name) {
      return res.send({ message: "Name is require" });
    }

    if (!email) {
      return res.send({ message: "email is require" });
    }

    if (!password) {
      return res.send({ message: "password is require" });
    }

    if (!phone) {
      return res.send({ message: "phone is require" });
    }

    if (!address) {
      return res.send({ message: "address is require" });
    }
    if (!answer) {
      return res.send({ message: "address is require" });
    }
    //existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered!!please Login",
      });
    }
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new UserModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer
    }).save();

   return res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (err) {
    console.log(err);
   return res.status(500).send({
      success: false,
      message: "error in registration",
      err,
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
    return  res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
     return res.status(404).send({
        success: false,
        message: "Email is not registered!!",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
     return res.status(401).send({
        success: false,
        message: "Invalid password!!",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
   return res.status(200).send({
      success: true,
      message: "Login success",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role:user.role,
        
      },
      token,
    });
  } catch (err) {
    console.log(err);
  return res.status(500).send({
      success: false,
      message: "Error in Login",
      err,
    });
  }
};
//forgot password
const forgotPasswordController = async (req, res) => {
  const { email, answer, newPassword } = req.body
  try {
    if (!email) {
      return res.status(200).send({ message: "Email is required" })
    }
    if (!answer) {
      return res.status(200).send({ message: "Answer is required" })
    }
    if (!newPassword) {
      return res.status(200).send({ message: "New password is required" })
    }
    const user = await UserModel.findOne({ email, answer })
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "wrong email or answer"
      })
    }
    const hashed = await hashPassword(newPassword)
    await UserModel.findByIdAndUpdate(user._id, { password: hashed })
    return res.status(200).send({
      success: true,
      message: "Password reset succesfully"
    })
  }
  catch (err) {
    console.log("error", err)
   return res.status.send({
      success: false,
      message:"something went wrong"
    })
  }
}

const testContoller = (req, res) => {
  res.send("protected Route");
};

//update prfole
const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await UserModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};
module.exports = { registerController, loginController, testContoller,forgotPasswordController,updateProfileController };
