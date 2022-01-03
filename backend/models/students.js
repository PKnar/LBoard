import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  name: String,
  points: Number,
});

const StudentModel = mongoose.model("Student", studentSchema);

export default StudentModel;
