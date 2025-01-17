import Company from "../models/companyModel.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      throw new Error("Company name required...❌");
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      throw new Error("You can't register same company...");
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    await company.save();

    return res.status(201).json({
      success: true,
      error: false,
      message: "Company registered successfully...✅",
      data: company,
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

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      throw new Error("Companies not found...❌");
    }

    return res.status(200).json({
      success: true,
      error: false,
      data: companies,
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

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      throw new Error("Company not found...✅");
    }

    return res.status(200).json({
      success: true,
      error: false,
      data: company,
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

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
 
    //cloudinary
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      folder: "resume",
    });
    const logo = cloudResponse.secure_url || "";

    const updateData = { name, description, website, location, logo }; 
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }); 

    if (!company) {
      throw new Error("Company not found...❌");
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Company information updated successfully...✅",
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
