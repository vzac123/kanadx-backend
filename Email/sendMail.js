// utils/sendMail.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // info@kanadx.com
    pass: process.env.EMAIL_PASS  // SMTP password from Hostinger
  }
});

// VERIFY TRANSPORTER ON STARTUP
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Error:", error);
  } else {
    console.log("✅ SMTP Server is ready to send emails");
  }
});

const sendEnquiryEmails = async ({
  name,
  email,
  company,
  phone,
  service,
  message
}) => {
  // USER EMAIL
  const userMail = {
    from: `"KANADX" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Thank you for contacting KANADX",
    html: `
      <p>Hi <strong>${name}</strong>,</p>
      <p>Thank you for enquiring about our service!</p>
      <p>Your message has been sent successfully.</p>
      <p>It has been forwarded to the relevant department and we'll be in touch as soon as possible.</p>

   

      <br/>
      <p>Best Regards,<br/>
      <strong>KANADX Team</strong><br/>
      info@kanadx.com</p>
    `
  };

  // ADMIN EMAIL
  const adminMail = {
    from: `"KANADX Website" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL, // info@kanadx.com
    subject: `🚀 New Enquiry from ${name}`,
    html: `
      <h3>New Website Enquiry</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || "N/A"}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `
  };

  // SEND EMAILS
  await transporter.sendMail(userMail);
  await transporter.sendMail(adminMail);
};

module.exports = { sendEnquiryEmails };
