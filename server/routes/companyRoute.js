import express from "express";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/companyController.js";
import { jwtAuth } from "../middlewares/auth.js";
import { multerUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", jwtAuth, registerCompany);
router.get("/get", jwtAuth, getCompany);
router.put("/update/:id", jwtAuth, multerUpload, updateCompany);
router.get("/get/:id", jwtAuth, getCompanyById);

export default router;
