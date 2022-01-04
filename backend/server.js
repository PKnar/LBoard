import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
import studentsRoute from "./routes/students.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDatabase();
app.use(cors());

//parser
app.use(express.json());

//routes
app.use("/api/students", studentsRoute);

app.get("/", (req, res) => {
  res.json({ message: "Server is active" });
});

app.listen(PORT, () => {
  console.log(`Database is listening to port:${PORT}`);
});
