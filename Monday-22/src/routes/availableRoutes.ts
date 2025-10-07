import express from "express";
import { createAvailability } from "../controllers/availableControllers";
import { validateRequest } from "../middleware/validationUser";
import { createAvailabilityValidation } from "../utils/availabilityValidation";

const router = express.Router();

router.put("/create", validateRequest(createAvailabilityValidation), createAvailability);

export default router;
