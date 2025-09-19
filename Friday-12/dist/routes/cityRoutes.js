import express from 'express';
import { getAllCities, createCity, updateCity, deleteCity } from '../controllers/cityControllers.js';
const router = express.Router();
router.get('/all', getAllCities);
router.post('/create', createCity);
router.put('/update', updateCity);
router.delete('/delete', deleteCity);
export default router;
//# sourceMappingURL=cityRoutes.js.map