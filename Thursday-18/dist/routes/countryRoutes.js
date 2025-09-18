import express from 'express';
import { getAllCountries, createCountry, updateCountry, deleteCountry } from '../controllers/countryControllers.js';
const router = express.Router();
router.get('/all', getAllCountries);
router.post('/create', createCountry);
router.put('/update', updateCountry);
router.delete('/delete', deleteCountry);
export default router;
//# sourceMappingURL=countryRoutes.js.map