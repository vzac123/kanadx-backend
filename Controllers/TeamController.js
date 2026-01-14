const TeamModel = require("../Models/TeamModel");
const cloudinary = require("../config/cloudinaryConfig");
require("dotenv").config();

/* -------------------------------------------------------------------------- */
/* 🟢 CREATE TEAM MEMBER */
/* -------------------------------------------------------------------------- */
const create_Team = async (req, res) => {
  try {
    const teamData = req.body;

    const newTeam = await TeamModel.create(teamData);

    res.status(200).json({
      msg: "Team member created successfully!",
      status: true,
      data: newTeam,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error creating team member: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 GET ALL TEAM MEMBERS */
/* -------------------------------------------------------------------------- */
const getAllTeam = async (req, res) => {
  try {
    const team = await TeamModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      count: team.length,
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error fetching team members: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 GET TEAM BY ID */
/* -------------------------------------------------------------------------- */
const get_Team_by_Id = async (req, res) => {
  try {
    const team = await TeamModel.findById(req.params.id);

    if (!team)
      return res.status(404).json({
        msg: "Team member not found",
        status: false,
      });

    res.status(200).json({ status: true, data: team });
  } catch (error) {
    res.status(500).json({
      msg: `Error fetching team member: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 UPDATE TEAM MEMBER */
/* -------------------------------------------------------------------------- */
const update_Team = async (req, res) => {
  try {
    const updated = await TeamModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({
        msg: "Team member not found",
        status: false,
      });

    res.status(200).json({
      msg: "Team member updated successfully",
      status: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error updating team member: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 DELETE TEAM MEMBER */
/* -------------------------------------------------------------------------- */
const delete_Team = async (req, res) => {
  try {
    const team = await TeamModel.findById(req.params.id);

    if (!team)
      return res.status(404).json({
        msg: "Team member not found",
        status: false,
      });

    await TeamModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      msg: "Team member deleted successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error deleting team member: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 UPLOAD TEAM PHOTO (CLOUDINARY) */
/* -------------------------------------------------------------------------- */
const upload_Team_Photo = (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({
        msg: "No file provided",
        status: false,
      });

    cloudinary.uploader
      .upload_stream(
        {
          folder: "TechMigrates/Team",
        },
        (error, result) => {
          if (error) {
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
  create_Team,
  getAllTeam,
  get_Team_by_Id,
  update_Team,
  delete_Team,
  upload_Team_Photo,
};
