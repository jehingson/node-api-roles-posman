import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'

import {createRoles} from './libs/initialSetup'

import productoRoutes from './routes/productos.routes'
import authRoutes from './routes/auth.routers'
import usersRoutes from "./routes/user.routes";

const app = express()
createRoles()

app.set('pkg', pkg)

app.use(morgan('dev'))
app.use(express.json())
app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description : app.get('pkg').description,
        version : app.get('pkg').version
    })
})


app.use('/api/producto',productoRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)


export default app