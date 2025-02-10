const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// CORS Configuration
const corsOptions = {
  origin: "https://portfolio-client-kupr.onrender.com", // Frontend URL
  methods: "GET,POST",
  credentials: true,
};
app.use(cors(corsOptions));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Routes
const contactRoute = require("./routes/contactRoutes");
app.use("/api/contact", contactRoute);

// POST Route to handle form submissions
app.post("/api/contactRoutes", async (req, res) => {
    const { name, email, message } = req.body;

    // Configure the SMTP transporter for sending emails
    const transporter = nodemailer.createTransport({
        service: "Gmail", // Or your SMTP service provider
        auth: {
            user: `muthukdm45@gmail.com`, // Your sender email (set in .env file)
            pass: `jyak xyuo bokg qrqf`, // Your app-specific password
        },
    });

    try {
        // Send Thank You email to the user
        await transporter.sendMail({
            from: `muthukdm45@gmail.com`,
            to: email, // User's email
            subject: "Thank You for Your Response!",
            text: `Hi ${name},\n\nThank you for reaching out to us. We have received your message:\n"${message}"\n\n`,
        });

        // Acknowledge form submission
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email." });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
