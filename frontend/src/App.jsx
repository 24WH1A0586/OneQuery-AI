import { useState } from "react";
import { askQuestion } from "./api";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async () => {
    const res = await askQuestion(question);
    setAnswer(res.data.answer);
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

      <button onClick={handleSubmit}>Ask</button>

      <p><strong>Answer:</strong> {answer}</p>
    </div>
  );
}

export default App;