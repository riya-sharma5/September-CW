import { Router } from "express";

import {
  registerUser,
  loginUser,
  generateOtp,
  verifyOTP,
  listUsers,
  userDetail,
  deleteUser,
  editUser,
} from "../controllers/userControllers.js";
import { verifyJWT } from "../middleware/JwtVerify.js";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post('/otp', generateOtp);
router.post('/verify', verifyOTP);
router.use(verifyJWT);
router.get("/list", listUsers);
router.get("/details", userDetail);
router.put("/edit", editUser);
router.delete("/delete", deleteUser);

export default router;
