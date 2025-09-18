import express from 'express';
import { getAllStates, createState, updateState, deleteState } from '../controllers/stateControllers.js';
import { checkFun } from '../controllers/countryControllers.js';
const router = express.Router();
router.get('/all', getAllStates);
router.post('/create', createState);
router.put('/update', updateState);
router.delete('/delete', deleteState);
router.post('/check', (req, res) => {
    console.log("body data ::: ,", req.body);
    res.json({
        message: "working fine"
    });
});
router.post("/hii", checkFun);
export default router;
//# sourceMappingURL=stateRoutes.js.map