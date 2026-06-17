const express = require("express");
const Subscription = require("../models/Subscription");

const router = express.Router();

// POST /subscribe
router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: "Enter a valid email" });
    }

    // Check if already subscribed
    const existing = await Subscription.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Already subscribed!" });
    }

    await Subscription.create({ email });

    res.status(201).json({ message: "Subscribed successfully! 🎉" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
