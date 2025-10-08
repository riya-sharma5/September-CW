import express from "express";
 import { createAvailability, availableUserList } from "../controllers/availableControllers";
import { validateRequest, validateQuery } from "../middleware/validationUser";
import { createAvailabilityValidation, availableUserListValidation } from "../utils/availabilityValidation";

const router = express.Router();

router.put("/create", validateRequest(createAvailabilityValidation), createAvailability);
router.get("/list", validateQuery(availableUserListValidation), availableUserList);

export default router;
