const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema({
  prompt: String,
  response: String,
}, { timestamps: true });

module.exports = mongoose.model("Prompt", promptSchema);