import React, { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark"); // switch themes
  const [lastQuestion, setLastQuestion] = useState("");

  const askAI = async () => {
    if (!question.trim()) return;

    setLastQuestion(question);
    setQuestion("");
    setLoading(true);
    setAnswer("");

    try {
      const res = await axios.post(
        "https://onequery-ai.vercel.app/ask",
        { question },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setAnswer(res.data.answer || "No response");
    } catch (err) {
      setAnswer("Error fetching response");
    } finally {
      setLoading(false);
    }
  };

  const currentStyle = styles[theme];

  return (
    <div style={currentStyle.container}>
      <div style={currentStyle.card}>
        <h1 style={currentStyle.title}>⚡ OneQuery AI</h1>

        {/* THEME SWITCHER */}
        <div style={{ marginBottom: "15px" }}>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="dark">Dark Tech</option>
            <option value="black">Pure Black</option>
            <option value="glass">Glass</option>
            <option value="hacker">Hacker</option>
          </select>
        </div>

        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something..."
          style={currentStyle.input}
        />

        <button onClick={askAI} disabled={loading} style={{...currentStyle.button,opacity: loading ? 0.6 : 1,cursor: loading ? "not-allowed" : "pointer"}}>
          {loading ? "Thinking..." : "Ask"}
        </button>

        {lastQuestion && (
          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              textAlign: "left",
            }}
          >
            <strong>You asked:</strong>
            <p style={{ marginTop: "5px" }}>{lastQuestion}</p>
          </div>
        )}

        <div style={currentStyle.responseBox}>
          {loading ? (
            <p style={currentStyle.loading}>Loading...</p>
          ) : (
        <div style={currentStyle.answer}>
          {answer.split("\n").map((line, index) => {
            const trimmed = line.trim();

            if (!trimmed) return null;

            if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
              return (
                <h3 key={index} style={{ margin: "10px 0" }}>
                  {trimmed.replace(/\*\*/g, "")}
                </h3>
              );
            }

  
              if (trimmed.startsWith("*")) {
                return (
                  <ul key={index} style={currentStyle.ul}>
                    <li>{trimmed.replace("*", "").trim()}</li>
                  </ul>
                );
              }

              
              if (/^\d+\./.test(trimmed)) {
                return (
                  <ol key={index} style={currentStyle.ul}>
                    <li>{trimmed.replace(/^\d+\.\s*/, "")}</li>
                  </ol>
                );
              }

              
              return (
                <p key={index} style={currentStyle.p}>
                  {trimmed}
                </p>
              );
            })}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

const base = {
  title: {
  marginBottom: "20px",
  fontFamily: "Orbitron, sans-serif",
  letterSpacing: "2px",
  fontSize: "28px"
},
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "15px",
    fontSize: "16px",
  },
  button: {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
  transition: "0.2s ease" 
  },
  responseBox: {
    marginTop: "25px",
    padding: "15px",
    borderRadius: "10px",
    minHeight: "80px",
    maxHeight: "400px",   
    overflowY: "auto",   
    textAlign: "left",
  },
  answer: { lineHeight: "1.8" },
  ul: { paddingLeft: "20px", marginBottom: "8px" },
  p: { marginBottom: "8px" },
};

// 🎨 THEMES
const styles = {
  // 🔥 Dark Tech (Best)
  dark: {
    ...base,
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingTop: "40px",
      background: "#0f172a",
      fontFamily: "Inter, sans-serif",
    },
    card: {
      background: "#111827",
      padding: "30px",
      borderRadius: "15px",
      width: "90%",
      maxWidth: "700px",
      color: "#e5e7eb",
      margin: "0 auto",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    },
    input: { ...base.input, background: "#1f2937", color: "#fff", border: "1px solid #374151" },
    button: { ...base.button, background: "#22c55e", color: "#000" },
    responseBox: { ...base.responseBox, background: "#1f2937" },
    loading: { color: "#9ca3af" },
  },

  // ⚫ Pure Black
  black: {
    ...base,
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingTop: "40px",
      background: "#000",
      fontFamily: "Inter, sans-serif",
    },
    card: {
      background: "#0a0a0a",
      padding: "30px",
      borderRadius: "15px",
      width: "90%",
      maxWidth: "700px",
      color: "#fff",
      margin: "0 auto",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    },
    input: { ...base.input, background: "#111", color: "#fff", border: "1px solid #333" },
    button: { ...base.button, background: "#3b82f6", color: "#fff" },
    responseBox: { ...base.responseBox, background: "#111" },
    loading: { color: "#aaa" },
  },

  // 💎 Glass Effect
  glass: {
    ...base,
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingTop: "40px",
      background: "linear-gradient(135deg, #0f172a, #020617)",
      fontFamily: "Inter, sans-serif",
    },
    card: {
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.1)",
      backdropFilter: "blur(10px)",
      padding: "30px",
      borderRadius: "15px",
      width: "90%",
      maxWidth: "700px",
      color: "#fff",
      margin: "0 auto",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    },
    input: { ...base.input, background: "#111", color: "#fff" },
    button: { ...base.button, background: "#06b6d4", color: "#000" },
    responseBox: { ...base.responseBox, background: "rgba(255,255,255,0.05)" },
    loading: { color: "#ccc" },
  },

  // 🟢 Hacker Mode
  hacker: {
    ...base,
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingTop: "40px",
      background: "#000",
      fontFamily: "monospace",
      color: "#00ff9f",
    },
    card: {
      background: "#000",
      padding: "30px",
      border: "1px solid #00ff9f",
      width: "90%",
      maxWidth: "700px",
      margin: "0 auto",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    },
    input: { ...base.input, background: "#000", color: "#00ff9f", border: "1px solid #00ff9f" },
    button: { ...base.button, background: "#00ff9f", color: "#000" },
    responseBox: { ...base.responseBox, background: "#000" },
    loading: { color: "#00ff9f" },
  },
};

export default App;