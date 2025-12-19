import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./db.js";

const PORT = 3000;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error("DB 연결 실패:", e);
    process.exit(1);
  }
}

startServer();
