import {Router} from 'express'
const router = Router()

import * as productoCtrl from "../controllers/producto.controllers";
import { auth} from "../middlewares";

router.post('/', [auth.auth, auth.isAdmin], productoCtrl.createProducto)

router.get('/', productoCtrl.getProductos)

router.get('/:productoId',  productoCtrl.getproductoById)

router.put('/:productoId', [auth.auth, auth.isAdmin], productoCtrl.updateProductoById)

router.delete('/:productoId', [auth.auth, auth.isAdmin], productoCtrl.deleteProductoById)


export default router;
