const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000; // Allows flexible port configuration

app.use(cors());
app.use(bodyParser.json());

// Ensure API Key is securely loaded
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("❌ Error: Missing OpenAI API key in environment variables!");
  process.exit(1); // Exit if API key is missing
}

const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ error: "⚠️ Prompt cannot be empty!" });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    if (response?.data?.choices?.length > 0) {
      return res.json({ response: response.data.choices[0].message.content });
    } else {
      throw new Error("Invalid response structure from OpenAI API");
    }
  } catch (error) {
    console.error("❌ OpenAI API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "⚠️ Internal Server Error. Try again later!" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
