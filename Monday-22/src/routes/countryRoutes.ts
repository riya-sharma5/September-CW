import express from 'express';
import { validateRequest, validateQuery } from '../middleware/validationUser.ts';
import {createCountryValidation, listCountryValidation, updateCountryValidation, deleteCountryValidation } from '../utils/validationCountry.ts';
import {
  getAllCountries,
  createCountry,
  updateCountry,
  deleteCountry
} from '../controllers/countryControllers.ts';

const router = express.Router();

router.get('/all', validateQuery(listCountryValidation), getAllCountries);
router.post('/create', validateRequest(createCountryValidation), createCountry);
router.put('/update', validateRequest(updateCountryValidation), updateCountry);
router.delete('/delete', validateRequest(deleteCountryValidation), deleteCountry);


export default router;
