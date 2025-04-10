import { Router } from 'express';
import { getPersonas, postPersona, putPersona, deletePersona, getPersona, getAuto} from '../Controllers/personaController';

const router = Router();


router.get('/persona', getPersonas);
router.get('/persona/:id', getPersona);
router.get('/persona/autos/:id', getAuto);
router.post('/persona', postPersona);
router.put('/persona/:id', putPersona);
router.delete('/persona/:id', deletePersona);

export default router;