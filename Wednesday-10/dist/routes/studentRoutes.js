import { Router } from "express";
import { registerStudent, loginStudent, listStudents, studentDetail, deleteStudent, } from "../controllers/studentController.js";
const router = Router();
router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/students", listStudents);
router.get("/details", studentDetail);
router.delete("/delete", deleteStudent);
export default router;
//# sourceMappingURL=studentRoutes.js.map