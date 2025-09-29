import express from 'express';
import { validateRequest, validateQuery } from '../middleware/validationUser.ts';
import { createCityValidation, deleteCityValidation, updateCityValidation, getAllCitiesValidation, listCityValidation } from '../utils/validationCity.ts';
import {
  getAllCities,
  createCity,
  cityList,
  updateCity,
  deleteCity
} from '../controllers/cityControllers.ts';

const router = express.Router();

router.get('/all', validateQuery(getAllCitiesValidation), getAllCities);
router.post('/create', validateRequest(createCityValidation), createCity);
router.get('/list', validateRequest(listCityValidation), cityList)
router.put('/update',validateRequest(updateCityValidation), updateCity);
router.delete('/delete', validateRequest(deleteCityValidation), deleteCity);

export default router;
