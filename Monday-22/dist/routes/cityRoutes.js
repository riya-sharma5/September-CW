"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validationUser_1 = require("../middleware/validationUser");
const validationCity_1 = require("../utils/validationCity");
const cityControllers_1 = require("../controllers/cityControllers");
const router = express_1.default.Router();
router.get('/all', (0, validationUser_1.validateQuery)(validationCity_1.getAllCitiesValidation), cityControllers_1.getAllCities);
router.post('/create', (0, validationUser_1.validateRequest)(validationCity_1.createCityValidation), cityControllers_1.createCity);
router.get('/list', (0, validationUser_1.validateRequest)(validationCity_1.listCityValidation), cityControllers_1.cityList);
router.put('/update', (0, validationUser_1.validateRequest)(validationCity_1.updateCityValidation), cityControllers_1.updateCity);
router.delete('/delete', (0, validationUser_1.validateRequest)(validationCity_1.deleteCityValidation), cityControllers_1.deleteCity);
exports.default = router;
//# sourceMappingURL=cityRoutes.js.map