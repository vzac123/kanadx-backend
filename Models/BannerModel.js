const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      default:
        "https://techmigrates.s3.ap-south-1.amazonaws.com/default-banner.jpg",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
);

module.exports = mongoose.model("Banner", bannerSchema);
