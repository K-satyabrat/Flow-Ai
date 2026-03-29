const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./database/db");
const promptRoutes = require("./routes/prompt.route");

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// Routes
app.use("/api", promptRoutes);

app.get("/test", (_, res) => {
  res.json({ message: "server running" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
