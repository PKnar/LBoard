import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  name: String,
  points: Number,
  image: String,
});

const StudentModel = mongoose.model("Student", studentSchema);

export default StudentModel;
