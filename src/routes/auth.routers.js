import {Router} from 'express'
const router = Router()

import * as authCtrl from "../controllers/auth.controller";
import { verifyRegister } from "../middlewares";

router.post('/registrar', [verifyRegister.checkUserEmail, verifyRegister.checkRolesExisted], authCtrl.registrar)

router.post('/ingresar', authCtrl.ingresar)

export default router;
