// controllers/enquiryController.js
const { sendEnquiryEmails } = require("../Email/sendMail");

exports.submitEnquiry = async (req, res) => {
  try {
    const { name, email, company, phone, service, message } = req.body;

    // VALIDATION
    if (!name || !email || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    // SEND EMAILS
    await sendEnquiryEmails({
      name,
      email,
      company,
      phone,
      service,
      message
    });

    return res.status(200).json({
      success: true,
      message: "Enquiry submitted successfully"
    });

  } catch (error) {
    console.error("❌ Enquiry Error:", error);

    return res.status(500).json({
      success: false,
      message: "Email service failed",
      error: error.message // TEMPORARY (remove in production)
    });
  }
};
