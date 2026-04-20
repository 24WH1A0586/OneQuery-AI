import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db.js";
import askRoute from "./routes/ask.js";

dotenv.config();

const app = express();


connectDB();


app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());


app.use("/ask", askRoute);

app.get("/", (req, res) => {
  res.send("API Running");
});


export default app;