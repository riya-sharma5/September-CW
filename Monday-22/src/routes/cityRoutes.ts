import express from 'express';
import {
  getAllCities,
  createCity,
  cityList,
  updateCity,
  deleteCity
} from '../controllers/cityControllers.js';

const router = express.Router();

router.get('/all', getAllCities);
router.post('/create', createCity);
router.get('/list', cityList)
router.put('/update', updateCity);
router.delete('/delete', deleteCity);

export default router;
