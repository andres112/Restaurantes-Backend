import { Router } from 'express';
import {
    all, allLocation, insert, update, deleteRes
    , allTable, tableAvailable, tableUpdate
} from '../controllers/restaurants/index';

import { verifyAuth } from '../middlewares/auth'; //utiliza el middleware de autenticacion

const router: Router = Router();

router.use(verifyAuth);// como el orden importa si este no se ejecuta no sigue ninguna

router.get('/', all);
router.get('/point', allLocation);
router.post('/', insert);
router.put('/:id', update);
router.delete('/:id', deleteRes);
router.get('/:id/tables', allTable);
router.get('/:id/tables/available', tableAvailable);
router.put('/:id/tables', tableUpdate);

export default router;