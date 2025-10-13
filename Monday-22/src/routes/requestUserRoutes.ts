import { Router } from "express";
import {validateRequest, validateQuery, validateParams} from '../middleware/validationUser'
import {sendRequestValidation, listValidation, acceptValidation, rejectValidation} from '../utils/requestUserValidation'
import {
  sendRequest,
  requestList,
  acceptRequest,
  rejectRequest,
  detailById
} from "../controllers/requestUserController";

const router = Router();

router.post("/send", validateRequest(sendRequestValidation), sendRequest);
router.get("/list", validateQuery(listValidation), requestList);
router.post("/accept", validateRequest(acceptValidation), acceptRequest);
router.post("/reject", validateRequest(rejectValidation), rejectRequest);
router.get("/detail/:id",detailById );

export default router;
