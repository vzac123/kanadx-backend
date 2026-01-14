const BannerModel = require("../Models/BannerModel");
const cloudinary = require("../config/cloudinaryConfig");
require("dotenv").config();

/* -------------------------------------------------------------------------- */
/* 🟢 Create Banner */
/* -------------------------------------------------------------------------- */
const create_Bannerr = async (req, res) => {
  try {
    const { image, status } = req.body;

    const newBanner = await BannerModel.create({
      image: image || undefined,
      status: status || "active",
    });

    res.status(200).json({
      msg: "Banner created successfully!",
      data: newBanner,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error creating banner: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get All Banners */
/* -------------------------------------------------------------------------- */
const getAllBannerr = async (req, res) => {
  try {
    const banners = await BannerModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      count: banners.length,
      data: banners,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error fetching banners: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Get Banner by ID */
/* -------------------------------------------------------------------------- */
const get_Banner_by_Id = async (req, res) => {
  try {
    const banner = await BannerModel.findById(req.params.id);

    if (!banner)
      return res.status(404).json({ msg: "Banner not found", status: false });

    res.status(200).json({ status: true, data: banner });
  } catch (error) {
    res.status(500).json({
      msg: `Error fetching banner: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Update Banner */
/* -------------------------------------------------------------------------- */
const update_Banner = async (req, res) => {
  try {
    const { status, image } = req.body;

    const updated = await BannerModel.findByIdAndUpdate(
      req.params.id,
      { status, image },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ msg: "Banner not found", status: false });

    res.status(200).json({
      msg: "Banner updated successfully",
      status: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error updating banner: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Delete Banner */
/* -------------------------------------------------------------------------- */
const delete_Banner = async (req, res) => {
  try {
    const banner = await BannerModel.findById(req.params.id);

    if (!banner)
      return res.status(404).json({ msg: "Banner not found", status: false });

    await BannerModel.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ msg: "Banner deleted successfully", status: true });
  } catch (error) {
    res.status(500).json({
      msg: `Error deleting banner: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 Upload Banner Image (Cloudinary) */
/* -------------------------------------------------------------------------- */
const fileupload = (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ msg: "No file provided", status: false });

    cloudinary.uploader
      .upload_stream(
        {
          folder: "TechMigrates/Banners",
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
  create_Bannerr,
  getAllBannerr,
  get_Banner_by_Id,
  update_Banner,
  delete_Banner,
  fileupload,
};
