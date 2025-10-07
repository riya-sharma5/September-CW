"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const availableControllers_1 = require("../controllers/availableControllers");
const validationUser_1 = require("../middleware/validationUser");
const availabilityValidation_1 = require("../utils/availabilityValidation");
const router = express_1.default.Router();
router.put("/create", (0, validationUser_1.validateRequest)(availabilityValidation_1.createAvailabilityValidation), availableControllers_1.createAvailability);
exports.default = router;
//# sourceMappingURL=availableRoutes.js.map