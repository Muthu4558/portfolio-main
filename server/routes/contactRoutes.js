const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    return res.status(200).json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error. Try again later." });
  }
});

module.exports = router;
