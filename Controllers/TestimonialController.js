const TestimonialModel = require("../Models/TestimonialModel");
const cloudinary = require("../config/cloudinaryConfig");
require("dotenv").config();

/* -------------------------------------------------------------------------- */
/* 🟢 CREATE TESTIMONIAL */
/* -------------------------------------------------------------------------- */
const create_Testimonial = async (req, res) => {
  try {
    const data = req.body;

    // Ensure rating is decimal (convert string to number)
    if (data.rating) data.rating = parseFloat(data.rating);

    const newTestimonial = await TestimonialModel.create(data);

    res.status(200).json({
      msg: "Testimonial created successfully!",
      status: true,
      data: newTestimonial,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error creating testimonial: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 GET ALL TESTIMONIALS */
/* -------------------------------------------------------------------------- */
const getAllTestimonial = async (req, res) => {
  try {
    const testimonials = await TestimonialModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error fetching testimonials: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 GET TESTIMONIAL BY ID */
/* -------------------------------------------------------------------------- */
const get_Testimonial_by_Id = async (req, res) => {
  try {
    const testimonial = await TestimonialModel.findById(req.params.id);

    if (!testimonial)
      return res.status(404).json({ msg: "Testimonial not found", status: false });

    res.status(200).json({ status: true, data: testimonial });
  } catch (error) {
    res.status(500).json({
      msg: `Error fetching testimonial: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 UPDATE TESTIMONIAL */
/* -------------------------------------------------------------------------- */
const update_Testimonial = async (req, res) => {
  try {
    const updatedData = req.body;

    if (updatedData.rating)
      updatedData.rating = parseFloat(updatedData.rating);

    const updated = await TestimonialModel.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ msg: "Testimonial not found", status: false });

    res.status(200).json({
      msg: "Testimonial updated successfully",
      status: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error updating testimonial: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 DELETE TESTIMONIAL */
/* -------------------------------------------------------------------------- */
const delete_Testimonial = async (req, res) => {
  try {
    const testimonial = await TestimonialModel.findById(req.params.id);

    if (!testimonial)
      return res.status(404).json({ msg: "Testimonial not found", status: false });

    await TestimonialModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      msg: "Testimonial deleted successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error deleting testimonial: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 UPLOAD CLIENT IMAGE (CLOUDINARY) */
/* -------------------------------------------------------------------------- */
const upload_Testimonial_Image = (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ msg: "No file provided", status: false });

    cloudinary.uploader
      .upload_stream(
        {
          folder: "TechMigrates/Testimonials",
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
  create_Testimonial,
  getAllTestimonial,
  get_Testimonial_by_Id,
  update_Testimonial,
  delete_Testimonial,
  upload_Testimonial_Image,
};
