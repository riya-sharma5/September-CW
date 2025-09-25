import { Router } from "express";
import { createUserValidation, validateQuery, editUserValidation, validateRequest, loginUserValidation, detailUserValidation, deleteUserValidation, resetUserValidation, changeUserValidation, verifyUserValidation, generateUserValidation, listUserValidation } from "../middleware/validationUser.js";
import { registerUser, loginUser, generateOtp, verifyOTP, listUsers, resetPassword, changePassword, userDetail, deleteUser, logoutUser, editUser, } from "../controllers/userControllers.js";
import { verifyJWT } from "../middleware/JwtVerify.js";
const router = Router();
router.post("/signup", validateRequest(createUserValidation), registerUser);
router.post("/login", validateRequest(loginUserValidation), loginUser);
router.post('/otp', validateRequest(generateUserValidation), generateOtp);
router.post('/verify', validateRequest(verifyUserValidation), verifyOTP);
router.post('/resetPass', validateRequest(resetUserValidation), resetPassword);
router.use(verifyJWT);
router.post('/changePass', validateRequest(changeUserValidation), changePassword);
router.get("/list", validateQuery(listUserValidation), listUsers);
router.get("/details", validateRequest(detailUserValidation), userDetail);
router.put("/edit", validateRequest(editUserValidation), editUser);
router.post('/logout', logoutUser);
router.delete("/delete", validateRequest(deleteUserValidation), deleteUser);
export default router;
//# sourceMappingURL=userRoutes.js.map