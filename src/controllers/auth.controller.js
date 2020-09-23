import Roles from "../models/Roles";
import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";

export const registrar = async (req, res) => {
  const { username, email, password, roles } = req.body;


  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password)
  });

  if(roles){
    const foundRoles = await Roles.find({name: {$in: roles}})
    newUser.roles = foundRoles.map(role => role._id)
  }else{
    const role = await Roles.findOne({name: "user"})
    newUser.roles = [role._id]
  }

  const saveUser = await newUser.save();
  console.log(saveUser)

  const token = jwt.sign({id: saveUser._id}, config.SECRET, {
    expiresIn: 86400 //24 HORAS
  })

  res.status(200).json({token})
  
};


export const ingresar = async (req, res) => {
  const userFond = await User.findOne({email: req.body.email}).populate("roles")
  if(!userFond) return res.status(400).json({message: 'usuario no existe!'})
  
  const matchPassword = await User.comparePassword(req.body.password, userFond.password)

  if(!matchPassword) return res.status(401).json({token: null, message:'Contraseña invalida!'})

  const token = jwt.sign({id: userFond._id}, config.SECRET, {
    expiresIn: 86400
  })

  res.status(200).json({token})
};
