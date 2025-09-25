import express from 'express';
import { createStateValidation, deleteStateValidation, updateStateValidation, getAllStatesValidation, listStateValidation } from '../utils/validationState.js';
import { validateRequest, validateQuery } from '../middleware/validationUser.js';
import { getAllStates, createState, stateList, updateState, deleteState } from '../controllers/stateControllers.js';
const router = express.Router();
router.get('/all', validateQuery(getAllStatesValidation), getAllStates);
router.post('/create', validateRequest(createStateValidation), createState);
router.get('/List', validateRequest(listStateValidation), stateList);
router.put('/update', validateRequest(updateStateValidation), updateState);
router.delete('/delete', validateRequest(deleteStateValidation), deleteState);
export default router;
//# sourceMappingURL=stateRoutes.js.map