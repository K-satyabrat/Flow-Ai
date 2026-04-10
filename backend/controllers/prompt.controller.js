const Prompt = require("../models/prompt");
const axios = require("axios");

const askAi = async (req, res) => {
  try {
    const { prompt, model } = req.body;

    console.log("Prompt:", prompt);

    const models = model
      ? [model]
      : ["meta-llama/llama-3-8b-instruct", "openchat/openchat-7b:free"];

    let answer = "";

    for (let m of models) {
      try {
        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model: m,
            messages: [{ role: "user", content: prompt }],
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
              "Content-Type": "application/json",
            },
            timeout: 10000,
          },
        );

        answer = response.data.choices[0].message.content;

        console.log("Used model:", m);
        break;
      } catch (err) {
        console.log(
          "Failed model:",
          m,
          err.response?.data?.error?.message || err.message,
        );
      }
    }

    if (!answer) {
      answer = "Please try again later.";
    }

    res.json({ answer });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const savePrompt = async (req, res) => {
  try {
    const { prompt, response } = req.body;

    const data = new Prompt({ prompt, response });
    await data.save();

    res.json({ message: "Saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Save failed" });
  }
};

module.exports = { askAi, savePrompt };
