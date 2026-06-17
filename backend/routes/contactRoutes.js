const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// POST /submit
router.post("/submit", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required" });
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: "Enter a valid email" });
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully! We will get back to you soon. 📬",
      contact,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
