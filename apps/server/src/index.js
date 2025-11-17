import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// CORS 허용 (front localhost:5173 요청 가능하게)
app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello from Express server 🚀",
    time: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
