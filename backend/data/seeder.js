import StudentModel from "../models/students.js";
import students from "./leaderboard.js";
import connectDatabase from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();
connectDatabase();

const importData = async () => {
  try {
    //deleting default data first
    await StudentModel.deleteMany();
    await StudentModel.insertMany(students);
    console.log("Data Imported ");
    process.exit();
  } catch (error) {
    console.error(`${error.message}`);
    process.exit(1);
  }
};

importData();
