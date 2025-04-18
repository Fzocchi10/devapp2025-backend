import { Router } from 'express';
import { deletePersona, getAutosDeLaPersona, getPersona, getPersonas, postPersona, putPersona } from '../Controllers/personaController';
import { validarDatosPersona, validarDatosPersonaExistentes } from '../Middlewares/ValidarDatosPersona';
import { verificarPersonaExiste } from '../Middlewares/VerificarPersonaExiste';

const router = Router();


router.get('/persona', getPersonas);
router.get('/persona/:id',verificarPersonaExiste, getPersona);
router.get('/persona/autos/:id',verificarPersonaExiste, getAutosDeLaPersona);
router.post('/persona', validarDatosPersona, postPersona);
router.put('/persona/:id',validarDatosPersonaExistentes, putPersona);
router.delete('/persona/:id',verificarPersonaExiste, deletePersona);

export default router;