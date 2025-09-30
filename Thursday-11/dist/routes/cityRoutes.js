"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cityController_1 = require("../controllers/cityController");
const router = express_1.default.Router();
router.get('/all', cityController_1.getAllCities);
router.post('/create', cityController_1.createCity);
router.put('/update', cityController_1.updateCity);
router.delete('/delete', cityController_1.deleteCity);
exports.default = router;
//# sourceMappingURL=cityRoutes.js.map