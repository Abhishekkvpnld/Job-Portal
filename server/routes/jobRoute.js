import express from "express";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  jobPost,
} from "../controllers/jobController.js";
import { jwtAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", jwtAuth, jobPost);
router.get("/get", getAllJobs);
router.get("/getAdminJob", jwtAuth, getAdminJobs);
router.get("/get/:id", getJobById);

export default router;
