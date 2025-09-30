"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stateControllers_1 = require("../controllers/stateControllers");
const countryControllers_1 = require("../controllers/countryControllers");
const router = express_1.default.Router();
router.get('/all', stateControllers_1.getAllStates);
router.post('/create', stateControllers_1.createState);
router.put('/update', stateControllers_1.updateState);
router.delete('/delete', stateControllers_1.deleteState);
router.post('/check', (req, res) => {
    console.log("body data ::: ,", req.body);
    res.json({
        message: "working fine"
    });
});
router.post("/hii", countryControllers_1.checkFun);
exports.default = router;
//# sourceMappingURL=stateRoutes.js.map