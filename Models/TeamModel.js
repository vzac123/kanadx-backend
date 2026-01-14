const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    teamname: {
      type: String,
      required: true,
      trim: true,
    },

    teamphoto: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },

    teamdesignation: {
      type: String,
      required: true,
      trim: true,
    },

    teamexperience: {
      type: String,
      required: true,
    },

    teamdescription: {
      type: String,
      required: true,
    },

    // ✅ NEW FIELD
    teamLinkedIn: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
