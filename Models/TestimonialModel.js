const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    client_name: {
      type: String,
      required: true,
      trim: true,
    },
    client_designation: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5, // rating should be between 0 and 5
    },
    client_image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    testimonial_text: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
