import { Router } from "express";
import { createUserValidation, validateQuery, editUserValidation, validateRequest, loginUserValidation,detailUserValidation, deleteUserValidation, resetUserValidation, changeUserValidation, verifyUserValidation, generateUserValidation, listUserValidation } from "../middleware/validationUser.ts";

import {
  registerUser,
  loginUser,
  generateOtp,
  verifyOTP,
  getAllUsers,
  resetPassword,
  changePassword,
  userDetail,
  deleteUser,
  logoutUser,
  editUser,
} from "../controllers/userControllers.ts";
import { verifyJWT } from "../middleware/JwtVerify.ts";


const router = Router();

router.post("/signup", validateRequest(createUserValidation), registerUser);
router.post("/login", validateRequest(loginUserValidation), loginUser);
router.post('/otp', validateRequest(generateUserValidation), generateOtp);
router.post('/verify', validateRequest(verifyUserValidation), verifyOTP);
router.post('/resetPass', validateRequest(resetUserValidation), resetPassword);
router.use(verifyJWT);
router.post('/changePass', validateRequest(changeUserValidation), changePassword)
router.get("/list", validateQuery(listUserValidation), getAllUsers);
router.get("/details", validateRequest(detailUserValidation), userDetail);
router.put("/edit", validateRequest(editUserValidation), editUser);
router.post('/logout', logoutUser);
router.delete("/delete", validateRequest(deleteUserValidation), deleteUser);

export default router;
