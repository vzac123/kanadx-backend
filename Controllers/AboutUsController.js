const AboutUsModel = require("../Models/AboutUsModel");
const cloudinary = require("../config/cloudinaryConfig");
require("dotenv").config();

/* -------------------------------------------------------------------------- */
/* 🟢 CREATE ABOUT US ENTRY */
/* -------------------------------------------------------------------------- */
const create_AboutUs = async (req, res) => {
  try {
    const data = req.body;

    const newAbout = await AboutUsModel.create(data);

    res.status(200).json({
      msg: "About Us created successfully!",
      status: true,
      data: newAbout,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error creating About Us: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 GET ALL ABOUT US ENTRIES */
/* -------------------------------------------------------------------------- */
const getAllAboutUs = async (req, res) => {
  try {
    const about = await AboutUsModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      count: about.length,
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error fetching About Us entries: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 GET ABOUT US BY ID */
/* -------------------------------------------------------------------------- */
const get_AboutUs_by_Id = async (req, res) => {
  try {
    const about = await AboutUsModel.findById(req.params.id);

    if (!about)
      return res.status(404).json({ msg: "About Us entry not found", status: false });

    res.status(200).json({ status: true, data: about });
  } catch (error) {
    res.status(500).json({
      msg: `Error fetching About Us entry: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 UPDATE ABOUT US ENTRY */
/* -------------------------------------------------------------------------- */
const update_AboutUs = async (req, res) => {
  try {
    const updated = await AboutUsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ msg: "About Us entry not found", status: false });

    res.status(200).json({
      msg: "About Us updated successfully",
      status: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error updating About Us: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 DELETE ABOUT US ENTRY */
/* -------------------------------------------------------------------------- */
const delete_AboutUs = async (req, res) => {
  try {
    const about = await AboutUsModel.findById(req.params.id);

    if (!about)
      return res.status(404).json({ msg: "About Us entry not found", status: false });

    await AboutUsModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      msg: "About Us deleted successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error deleting About Us: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 UPLOAD ABOUT US IMAGE (CLOUDINARY) */
/* -------------------------------------------------------------------------- */
const upload_AboutUs_Image = (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ msg: "No file provided", status: false });

    cloudinary.uploader
      .upload_stream(
        {
          folder: "TechMigrates/AboutUs",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return res.status(400).json({
              msg: "Image upload failed",
              status: false,
            });
          }

          res.status(200).json({
            msg: "Image uploaded successfully",
            imageUrl: result.secure_url,
            status: true,
          });
        }
      )
      .end(req.file.buffer);
  } catch (error) {
    res.status(500).json({
      msg: `Upload error: ${error.message}`,
      status: false,
    });
  }
};

module.exports = {
  create_AboutUs,
  getAllAboutUs,
  get_AboutUs_by_Id,
  update_AboutUs,
  delete_AboutUs,
  upload_AboutUs_Image,
};
