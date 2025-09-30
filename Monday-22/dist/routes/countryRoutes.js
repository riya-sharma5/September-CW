"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validationUser_1 = require("../middleware/validationUser");
const validationCountry_1 = require("../utils/validationCountry");
const countryControllers_1 = require("../controllers/countryControllers");
const router = express_1.default.Router();
router.get('/all', (0, validationUser_1.validateQuery)(validationCountry_1.listCountryValidation), countryControllers_1.getAllCountries);
router.post('/create', (0, validationUser_1.validateRequest)(validationCountry_1.createCountryValidation), countryControllers_1.createCountry);
router.put('/update', (0, validationUser_1.validateRequest)(validationCountry_1.updateCountryValidation), countryControllers_1.updateCountry);
router.delete('/delete', (0, validationUser_1.validateRequest)(validationCountry_1.deleteCountryValidation), countryControllers_1.deleteCountry);
exports.default = router;
//# sourceMappingURL=countryRoutes.js.map