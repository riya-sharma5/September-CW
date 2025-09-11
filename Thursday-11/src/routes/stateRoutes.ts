import express from 'express';
import {
  getAllStates,
  createState,
  updateState,
  deleteState
} from '../controllers/stateController.js';

const router = express.Router();

router.get('/all', getAllStates);
router.post('/create', createState);
router.put('/update', updateState);
router.delete('/delete', deleteState);

export default router;
