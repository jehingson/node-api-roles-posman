import {Router} from 'express'
const router = Router()

import * as userCtrl from "../controllers/user.controller";
import {auth, verifyRegister } from '../middlewares'

router.post('/', [auth.auth, auth.isAdmin, verifyRegister.checkRolesExisted], userCtrl.createUser)

export default router;
