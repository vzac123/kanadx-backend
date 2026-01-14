const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const testimonialController = require("../Controllers/TestimonialController");

// CRUD Routes
router.post("/create__testimonial", testimonialController.create_Testimonial);
router.get("/getall__testimonial", testimonialController.getAllTestimonial);
router.get("/get__testimonial__by__Id/:id", testimonialController.get_Testimonial_by_Id);
router.put("/update__testimonial/:id", testimonialController.update_Testimonial);
router.delete("/delete__testimonial/:id", testimonialController.delete_Testimonial);

// Upload Image
router.post(
  "/upload-testimonial-image",
  upload.single("client_image"),
  testimonialController.upload_Testimonial_Image
);

module.exports = router;
