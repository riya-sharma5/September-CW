"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validationState_1 = require("../utils/validationState");
const validationUser_1 = require("../middleware/validationUser");
const stateControllers_1 = require("../controllers/stateControllers");
const router = express_1.default.Router();
router.get('/all', (0, validationUser_1.validateQuery)(validationState_1.getAllStatesValidation), stateControllers_1.getAllStates);
router.post('/create', (0, validationUser_1.validateRequest)(validationState_1.createStateValidation), stateControllers_1.createState);
router.get('/List', (0, validationUser_1.validateRequest)(validationState_1.listStateValidation), stateControllers_1.stateList);
router.put('/update', (0, validationUser_1.validateRequest)(validationState_1.updateStateValidation), stateControllers_1.updateState);
router.delete('/delete', (0, validationUser_1.validateRequest)(validationState_1.deleteStateValidation), stateControllers_1.deleteState);
exports.default = router;
//# sourceMappingURL=stateRoutes.js.map