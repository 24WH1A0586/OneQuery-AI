import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "user", content: question }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    const answer = response.data.choices[0].message.content;

    res.json({ answer });

  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);

    res.status(500).json({
      error: "Something went wrong",
      details: err.response?.data || err.message
    });
  }
});

export default router;