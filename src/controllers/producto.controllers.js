import Producto from "../models/Producto";

export const createProducto = async (req, res) => {
  const { name, category, price, imgURL } = req.body;
  const newProducto = new Producto({name, category, price, imgURL})
  
  const productoSave = await newProducto.save()
  
  res.status(201).json(productoSave);
};

export const getProductos = async (req, res) => {
  const producto = await Producto.find();
  res.status(200).json(producto)
};
export const getproductoById = async (req, res) => {
  const producto = await Producto.findById(req.params.productoId)
  res.status(200).json(producto)
};

export const updateProductoById = async (req, res) => {
  const updatedProducto = await Producto.findByIdAndUpdate(req.params.productoId, req.body, {
    new: true
  })
  res.status(200).json(updatedProducto)
};

export const deleteProductoById = async (req, res) => {
  const {productoId} = req.params
  await Producto.findByIdAndDelete(productoId)
  res.status(204).json()
};
