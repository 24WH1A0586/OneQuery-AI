import React, { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = async () => {
  try {
    const res = await axios.post(
      "https://onequery-ai.vercel.app//ask",
      { question }
    );

    console.log(res.data);   
    setAnswer(res.data.answer);

  } catch (err) {
    console.log(err);       
    setAnswer("Error fetching response");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Assistant</h1>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask something..."
      />

      <button onClick={askAI}>Ask</button>

      <p><strong>Answer:</strong> {answer}</p>
    </div>
  );
}

export default App;