"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentControllers_1 = require("../controllers/studentControllers");
const router = (0, express_1.Router)();
router.post("/register", studentControllers_1.registerStudent);
router.post("/login", studentControllers_1.loginStudent);
router.get("/students", studentControllers_1.listStudents);
router.get("/details", studentControllers_1.studentDetail);
router.put("/edit", studentControllers_1.editStudent);
router.delete("/delete", studentControllers_1.deleteStudent);
exports.default = router;
//# sourceMappingURL=studentRoutes.js.map