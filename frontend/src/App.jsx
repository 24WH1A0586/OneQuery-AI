import React, { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    setLoading(true);
    setAnswer(""); 
    try {
      const res = await axios.post(
        "https://onequery-ai.vercel.app/ask", 
        { question },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      

      setAnswer(res.data.answer || res.data.response || "No response");
    } catch (err) {
    setAnswer("Error fetching response");
    } finally {
    setLoading(false); 
  }
};

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>AI Assistant</h1>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask something..."
        style={{
          padding: "10px",
          width: "300px",
          marginRight: "10px",
        }}
      />

      <button onClick={askAI} disabled={loading} style={{ padding: "10px" }}>
        {loading ? "Thinking..." : "Ask"}
      </button>

      <div style={{ marginTop: "20px" }}>
        <strong>Answer:</strong>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>{answer}</p>
        )}
      </div>
    </div>
  );
}

export default App;