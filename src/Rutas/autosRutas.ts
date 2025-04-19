import { Router } from 'express';
import { getAutos, getAuto, postAuto, putAuto, deleteAuto } from '../Controllers/autoController';
import { verificarAutoExiste } from '../Middlewares/VerificarAutoExiste';
import { verificarDueñoExiste } from '../Middlewares/VerificarDueñoExiste';
import { validarDatosAutoExistentes, validarDatosAutos } from '../Middlewares/ValidarDatosAutos';

const router = Router();

router.get('/autos', getAutos);
router.get('/autos/:id',verificarAutoExiste, verificarDueñoExiste, getAuto);
router.post('/autos',validarDatosAutos, postAuto);
router.put('/autos/:id',validarDatosAutoExistentes, putAuto);
router.delete('/autos/:id', deleteAuto);

export default router;