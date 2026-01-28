const express = require("express");
const router = express.Router();

const {
  submitEnquiry
} = require("../Controllers/enquiryController");

// POST Enquiry Route
router.post("/enquiry", submitEnquiry);

module.exports = router;


