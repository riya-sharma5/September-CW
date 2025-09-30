"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const countryControllers_1 = require("../controllers/countryControllers");
const router = express_1.default.Router();
router.get('/all', countryControllers_1.getAllCountries);
router.post('/create', countryControllers_1.createCountry);
router.put('/update', countryControllers_1.updateCountry);
router.delete('/delete', countryControllers_1.deleteCountry);
exports.default = router;
//# sourceMappingURL=countryRoutes.js.map