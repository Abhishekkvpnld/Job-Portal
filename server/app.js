import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Server running...");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
