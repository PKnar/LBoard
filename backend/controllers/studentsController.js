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
  console.log(req.params);
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
    let { name, points, image } = req.body;
    name = name.charAt(0).toUpperCase() + name.substr(1);

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
    let { name, points, image } = req.body;
    name = name.charAt(0).toUpperCase() + name.substr(1);

    const student = await StudentModel.findById(req.params.id);

    if (student) {
      student.name = name || student.name;
      student.points = points || student.points;
      image;

      const updatedStudent = await student.save();
      res.status(200).json(updatedStudent);
    } else {
      res.status(500).json("Error: Data update failed");
    }
  } catch (error) {
    console.log(error);
  }
};

//@desc delete student
//@route delete /api/students/delete
//@access public

const deleteStudent = async (req, res) => {
  try {
    const student = await StudentModel.findById(req.params.id);

    if (student) {
      StudentModel.findByIdAndRemove(
        req.params.id,
        student,
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
