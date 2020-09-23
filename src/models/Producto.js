import {Schema, model} from 'mongoose'

const productoSchema = new Schema({
    name: String,
    category: String,
    price: Number,
    imgURL: String
},{
    timestamps: true,
    versionKey: false
})

export default model('Producto', productoSchema)