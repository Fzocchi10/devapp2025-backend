import { Router } from 'express';
import { getAutos, getAuto, postAuto, putAuto, deleteAuto } from '../Controllers/autoController';
import { verificarAutoExiste } from '../Middlewares/VerificarAutoExiste';
import { validarDatosAutoExistentes, validarDatosAutos } from '../Middlewares/ValidarDatosAutos';
import { verificarDuenioExiste } from '../Middlewares/VerificarDuenioExiste';

const router = Router();

router.get('/autos', getAutos);
router.get('/autos/:id',verificarAutoExiste, getAuto);
router.post('/autos', validarDatosAutos, verificarDuenioExiste, postAuto);
router.put('/autos/:id',verificarAutoExiste, validarDatosAutoExistentes, putAuto);
router.delete('/autos/:id',verificarAutoExiste, deleteAuto);

export default router;