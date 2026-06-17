const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://laibaabayastore.netlify.app",
  credentials: true
}));
app.use(express.json());

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/subscriptions", require("./routes/subscriptionRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ✅ Vercel ke liye — connectDB call karo but app.listen() NAHI
connectDB();

module.exports = app;  // ✅ Sirf export karo