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

//@desc fetch student by id
//@route GET /api/students/:id
//@access public

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

//@desc  add student
//@route POST /api/students/create
//@access public

const addNewStudent = async (req, res) => {
  try {
    const { name, points, image } = req.body;

    const studentExists = await StudentModel.findOne({ name });

    if (studentExists) {
      res.status(400).json({ message: "Student already exists" });
    }

    const newStudent = await StudentModel.create({ name, points, image });

    if (newStudent) {
      res.status(201).json(newStudent);
    } else {
      res.status(400).json({ message: "Invalid  data" });
    }
  } catch (error) {
    console.log(error);
  }
};

//@desc update student
//@route PUT /api/students/update
//@access public

const updateStudent = async (req, res) => {
  try {
    const { name, points } = req.body;
    console.log(req.body);
    const student = await StudentModel.findById(req.body._id);

    if (student) {
      student.name = name || student.name;
      student.points = points || student.points;
    }

    const updatedStudent = await student.save();

    res.json(updatedStudent);
  } catch (error) {
    console.log(error);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await StudentModel.findById(req.body._id);

    if (student) {
      StudentModel.findByIdAndRemove(
        req.body._id,
        req.body,
        function (err, data) {
          if (!err) {
            console.log("Deleted");
            res.json({ message: "Successfully deleted" });
          }
        }
      );
    } else {
      res.status(400).json({ message: "Student does not exist" });
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  getStudents,
  getStudentById,
  addNewStudent,
  updateStudent,
  deleteStudent,
};
