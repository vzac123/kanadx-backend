const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const aboutUsController = require("../Controllers/AboutUsController");

// CRUD Routes
router.post("/create__aboutus", aboutUsController.create_AboutUs);
router.get("/getall__aboutus", aboutUsController.getAllAboutUs);
router.get("/get__aboutus__by__Id/:id", aboutUsController.get_AboutUs_by_Id);
router.put("/update__aboutus/:id", aboutUsController.update_AboutUs);
router.delete("/delete__aboutus/:id", aboutUsController.delete_AboutUs);

// Upload Image Route
router.post(
  "/upload-aboutus-image",
  upload.single("About_us_image"),
  aboutUsController.upload_AboutUs_Image
);

module.exports = router;
