import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!userId) {
      throw new Error("Please login first...");
    }

    if (!jobId) {
      throw new Error("Job not found...");
    }

    // check job available
    const checkJob = await Job.findById(jobId);
    if (!checkJob) {
      throw new Error("Job not available...");
    }

    // check user already applied
    const checkApplied = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (checkApplied) {
      throw new Error("You have already applied for this job...");
    }

    // create new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    checkJob.applications.push(newApplication._id);
    await checkJob.save();

    return res.status(201).json({
      success: true,
      error: false,
      message: "Job applied successfully...",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
};

export const getAppliedJob = async (req, res) => {
  try {
    const userId = req.id;
    const applicatons = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!applicatons) {
      throw new Error("No Applications Found...");
    }

    return res.status(200).json({
      success: true,
      error: false,
      data: applicatons,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
};

// export const applyJob = async (req,res)=>{
//     try {

//     } catch (error) {
//         console.log(error)
//     res.status(500).json({
//         error:true,
//         success:false,
//         message:error.message
//     })
//     }
// }