import express from "express";
import {jwtAuth} from "../middlewares/auth.js";
import {
  applyJob,
  getApplicants,
  getAppliedJob,
  updateStatus,
} from "../controllers/applicationController.js";

const router = express.Router();

router.get("/apply/:id", jwtAuth, applyJob);
router.get("/get", jwtAuth, getAppliedJob);
router.get("/:id/applicants", jwtAuth, getApplicants);
router.post("/status/:id/update", jwtAuth, updateStatus);

export default router; 
 