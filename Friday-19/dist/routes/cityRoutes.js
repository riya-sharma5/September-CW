"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cityControllers_1 = require("../controllers/cityControllers");
const router = express_1.default.Router();
router.get('/all', cityControllers_1.getAllCities);
router.post('/create', cityControllers_1.createCity);
router.get('/list', cityControllers_1.cityList);
router.put('/update', cityControllers_1.updateCity);
router.delete('/delete', cityControllers_1.deleteCity);
exports.default = router;
//# sourceMappingURL=cityRoutes.js.map