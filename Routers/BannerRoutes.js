const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const bannerController = require("../Controllers/BannerController");

// CRUD Routes
router.post("/create__banner", bannerController.create_Bannerr);
router.get("/getall__banner", bannerController.getAllBannerr);
router.get("/get__banner__by__Id/:id", bannerController.get_Banner_by_Id);
router.put("/update__banner/:id", bannerController.update_Banner);
router.delete("/delete__banner/:id", bannerController.delete_Banner);

// Upload Image
router.post(
  "/upload-image",
  upload.single("image"),
  bannerController.fileupload
);

module.exports = router;
