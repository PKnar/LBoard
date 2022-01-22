import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
import studentsRoute from "./routes/students.js";
import path from "path";

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDatabase();
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/students", studentsRoute);

// app.get("/", (req, res) => {
//   res.json({ message: "Server is active" });
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(PORT, (req, res) => {
  console.log(`Server is running:State ${process.env.NODE_ENV},PORT:${PORT}`);
});
