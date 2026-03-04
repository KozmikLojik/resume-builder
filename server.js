const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        max_tokens: 1024,
        messages: req.body.messages,
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "content-type": "application/json",
        },
      }
    );
    res.json({
      content: [{ text: response.data.choices[0].message.content }]
    });
  } catch (err) {
    console.error(err.response?.data);
    res.status(500).json({ error: "API call failed" });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));