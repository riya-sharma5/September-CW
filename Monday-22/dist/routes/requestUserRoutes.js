"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validationUser_1 = require("../middleware/validationUser");
const requestUserValidation_1 = require("../utils/requestUserValidation");
const requestUserController_1 = require("../controllers/requestUserController");
const router = (0, express_1.Router)();
router.post("/send", (0, validationUser_1.validateRequest)(requestUserValidation_1.sendRequestValidation), requestUserController_1.sendRequest);
router.get("/list", (0, validationUser_1.validateQuery)(requestUserValidation_1.listValidation), requestUserController_1.requestList);
router.post("/accept", (0, validationUser_1.validateRequest)(requestUserValidation_1.acceptValidation), requestUserController_1.acceptRequest);
router.post("/reject", (0, validationUser_1.validateRequest)(requestUserValidation_1.rejectValidation), requestUserController_1.rejectRequest);
router.get("/detail/:id", requestUserController_1.detailById);
exports.default = router;
//# sourceMappingURL=requestUserRoutes.js.map