const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // ✅ Serve frontend

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("❌ OPENAI_API_KEY not found in .env");
  process.exit(1);
}

const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

app.post("/chatbot", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ error: "⚠️ Prompt cannot be empty!" });
  }

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
            You are GPB AURION, an elegant and intelligent AI assistant designed by Gyanankur P. Baruah.
            Be concise, helpful, and professional.
          `.trim(),
        },
        { role: "user", content: prompt },
      ],
    });

    const reply = response?.data?.choices?.[0]?.message?.content?.trim();
    if (reply) {
      res.json({ response: reply });
    } else {
      throw new Error("No valid reply from OpenAI.");
    }
  } catch (error) {
    console.error("OpenAI Error:", error.response?.data || error.message);
    res.status(500).json({ error: "⚠️ Internal Server Error." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});