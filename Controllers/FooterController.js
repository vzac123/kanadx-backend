const FooterModel = require("../Models/FooterModel");

/* -------------------------------------------------------------------------- */
/* 🟢 CREATE FOOTER ENTRY */
/* -------------------------------------------------------------------------- */
const create_Footer = async (req, res) => {
  try {
    const data = req.body;

    const newFooter = await FooterModel.create(data);

    res.status(200).json({
      msg: "Footer details created successfully!",
      status: true,
      data: newFooter,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error creating footer details: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 GET ALL FOOTER ENTRIES */
/* -------------------------------------------------------------------------- */
const getAllFooter = async (req, res) => {
  try {
    const footer = await FooterModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      count: footer.length,
      data: footer,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error fetching footer details: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 GET FOOTER BY ID */
/* -------------------------------------------------------------------------- */
const get_Footer_by_Id = async (req, res) => {
  try {
    const footer = await FooterModel.findById(req.params.id);

    if (!footer)
      return res.status(404).json({ msg: "Footer not found", status: false });

    res.status(200).json({ status: true, data: footer });
  } catch (error) {
    res.status(500).json({
      msg: `Error fetching footer details: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 UPDATE FOOTER ENTRY */
/* -------------------------------------------------------------------------- */
const update_Footer = async (req, res) => {
  try {
    const updated = await FooterModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ msg: "Footer not found", status: false });

    res.status(200).json({
      msg: "Footer updated successfully",
      status: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error updating footer: ${error.message}`,
      status: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟢 DELETE FOOTER ENTRY */
/* -------------------------------------------------------------------------- */
const delete_Footer = async (req, res) => {
  try {
    const footer = await FooterModel.findById(req.params.id);

    if (!footer)
      return res.status(404).json({ msg: "Footer not found", status: false });

    await FooterModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      msg: "Footer deleted successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error deleting footer: ${error.message}`,
      status: false,
    });
  }
};

module.exports = {
  create_Footer,
  getAllFooter,
  get_Footer_by_Id,
  update_Footer,
  delete_Footer,
};
