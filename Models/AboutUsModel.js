const mongoose = require("mongoose");

const AboutUsSchema = new mongoose.Schema(
  {
    About_us_title: {
      type: String,
      required: true,
      trim: true,
    },
    About_us_description: {
      type: String,
      required: true,
    },
    About_us_image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=800&h=600&fit=crop",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  
);

module.exports = mongoose.model("AboutUs", AboutUsSchema);
