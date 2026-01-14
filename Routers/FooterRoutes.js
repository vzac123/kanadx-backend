const express = require("express");
const router = express.Router();

const footerController = require("../Controllers/FooterController");

// CRUD Routes
router.post("/create__footer", footerController.create_Footer);
router.get("/getall__footer", footerController.getAllFooter);
router.get("/get__footer__by__Id/:id", footerController.get_Footer_by_Id);
router.put("/update__footer/:id", footerController.update_Footer);
router.delete("/delete__footer/:id", footerController.delete_Footer);

module.exports = router;
