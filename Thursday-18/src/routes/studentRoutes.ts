import { Router } from "express";
import {
  registerStudent,
  loginStudent,
  listStudents,
  studentDetail,
  deleteStudent,
  editStudent,
} from "../controllers/studentControllers";

const router = Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/students", listStudents);
router.get("/details", studentDetail);
router.put("/edit", editStudent);
router.delete("/delete", deleteStudent);

export default router;
