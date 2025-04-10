import { Router } from 'express';
import { getAutos, getAuto, postAuto, putAuto, deleteAuto } from '../Controllers/autoController';

const router = Router();

router.get('/autos', getAutos);
router.post('/autos', postAuto);
router.put('/autos/:id', putAuto);
router.delete('/autos/:id', deleteAuto);

export default router;