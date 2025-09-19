import { Router } from "express";
import {
  registerStudent,
  loginStudent,
  listStudents,
  studentDetail,
  deleteStudent,
  editStudent,
} from "../controllers/studentControllers.js";
import { verifyJWT } from "../middleware/JwtVerify.js";

const router = Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.use(verifyJWT);
router.get("/students", listStudents);
router.get("/details", studentDetail);
router.put("/edit", editStudent);
router.delete("/delete", deleteStudent);

export default router;
