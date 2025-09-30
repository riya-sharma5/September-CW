"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stateController_1 = require("../controllers/stateController");
const router = express_1.default.Router();
router.get('/all', stateController_1.getAllStates);
router.post('/create', stateController_1.createState);
router.put('/update', stateController_1.updateState);
router.delete('/delete', stateController_1.deleteState);
exports.default = router;
//# sourceMappingURL=stateRoutes.js.map