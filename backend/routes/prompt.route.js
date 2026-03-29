const express = require("express");
const {askAi,savePrompt } = require("../controllers/prompt.controller");

const router = express.Router();

router.post("/ask-ai", askAi);
router.post("/save", savePrompt);

module.exports = router;
