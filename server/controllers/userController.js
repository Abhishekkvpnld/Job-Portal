import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullname, email, password, phone, role } = req.body;
    if (!fullname || !email || !password || !phone || !role) {
      throw new Error("Provide all details...❌");
    }

    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exist with this email...❌");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      error: false,
      message: "User registered successfully...✅",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please Provide All Details...❌");
    }

    const user = await User.findOne({ email });
    if (user) {
      throw new Error("Incorrect email or password...❌");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      throw new Error("Incorrect email or password...❌");
    }

    if (role !== user.role) {
      throw new Error("Account doesn't exist with current role...❌");
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        error: false,
        message: `Welcome back ${user.fullname}...✅`,
        data: user,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      error: false,
      message: "User logged out successfully...✅",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phone, bio, skills } = req.body;
    const file = req.file;

    if (!fullname || !email || !phone || !bio || !skills) {
      throw new Error("Something is missing...❌");
    }

    const userId = req.id;
    const skillsArray = skills.split(",");

    let user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found...❌");
    }

    //Updating data
    user.fullname = fullname;
    user.email = email;
    user.phone = phone;
    user.profile.bio = bio;
    user.profile.skills = skillsArray;

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profile: user.profile,
    };

    return res.status(500).json({
      success: true,
      error: false,
      message: "Profile Updated Successfully...✅",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

//   export const login = async (req, res) => {
//     try {
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         success: false,
//         error: true,
//         message: error.message,
//       });
//     }
//   };

//   export const login = async (req, res) => {
//     try {
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         success: false,
//         error: true,
//         message: error.message,
//       });
//     }
//   };
