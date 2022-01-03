import StudentModel from "../models/students.js";

//@desc fetch all students
//@route GET /api/students
//@access public

const getStudents = async (req, res) => {
  try {
    const students = await StudentModel.find({});
    res.json(students);
  } catch (error) {
    console.log(error);
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await StudentModel.findById(req.params.id);
    if (student) {
      res.json(student);
    } else {
      res.status(404);
      throw new Error("Student not found");
    }
  } catch (error) {
    console.log(error);
  }
};

export { getStudents };
