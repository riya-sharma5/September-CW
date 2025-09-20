import express from 'express';
import {
  getAllStates,
  createState,
  stateList, 
  updateState,
  deleteState
} from '../controllers/stateControllers.js';


const router = express.Router();

router.get('/all', getAllStates);
router.post('/create', createState);
router.get('/List', stateList)
router.put('/update', updateState);
router.delete('/delete', deleteState);



export default router;
