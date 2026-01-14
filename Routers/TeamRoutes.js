const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const teamController = require("../Controllers/TeamController");

// CRUD Routes
router.post("/create__team", teamController.create_Team);
router.get("/getall__team", teamController.getAllTeam);
router.get("/get__team__by__Id/:id", teamController.get_Team_by_Id);
router.put("/update__team/:id", teamController.update_Team);
router.delete("/delete__team/:id", teamController.delete_Team);

// Upload Photo
router.post(
  "/upload-team-photo",
  upload.single("teamphoto"),
  teamController.upload_Team_Photo
);

module.exports = router;
