import express from "express";
import { login, logout, register, updateProfile } from "../controllers/userController.js";
import { jwtAuth } from "../middlewares/auth.js";
import { multerUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register",multerUpload,register);
router.post("/login",login);
router.put("/profile/update",jwtAuth,multerUpload,updateProfile);
router.get("/logout",logout);


export default router;