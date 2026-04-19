import express from "express";
import axios from "axios";
import Chat from "../models/Chat.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    // Call Groq API
    const aiRes = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: question }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const answer = aiRes.data.choices[0].message.content;

    // Save to DB (logging only)
    await Chat.create({
      question,
      response: answer
    });

    res.json({ answer });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;