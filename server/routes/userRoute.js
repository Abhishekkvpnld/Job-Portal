import express from "express";
import { login, logout, register, updateProfile } from "../controllers/userCOntroller.js";
import { jwtAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.put("/profile/update",jwtAuth,updateProfile);
router.get("/logout",logout);


export default router;