import express from "express";
import {
  addNewStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  updateStudent,
} from "../controllers/studentsController.js";

const router = express.Router();

router.route("/").get(getStudents);
router.route("/:id").get(getStudentById);
router.route("/create").post(addNewStudent);
router.route("/update/:id").put(updateStudent);
router.route("/delete/:id").delete(deleteStudent);

export default router;
